/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DeleteCommand, DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand, QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
const bodyParser = require("body-parser")
const express = require("express")

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}


// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


/************************************
* HTTP Get method to list objects *
************************************/

app.get("/api/users", async function(req, res) {
  var params = {
    TableName: tableName,
    Select: "ALL_ATTRIBUTES",
  };

  try {
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({error: "Could not load items: " + err.message});
  }
});

/************************************
* HTTP Get method to get single artwork *
************************************/
app.get("/api/users/:userId/artworks/:userId", async function(req,res) {

  // shared id between user and their artwork
  const userId = req.params.userId;

  const getItemParams = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: userId
    }
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(getItemParams));
    if (data.Item) {
      const artworkResponse = {
        id: data.Item.sk,
        title: data.Item.title,
        category: data.Item.category,
        is_approved: data.Item.is_approved,
        votes: data.Item.votes,

      };
      res.json(artworkResponse);
    }
  } catch (err) {
    res.statusCode = 500;
    res.json({error: "Could not load items: " + err.message});
  }
});

/************************************
* HTTP Post method to create single artwork *
************************************/

app.post("/api/users/:userId/artworks", async function (req,res) {

  /// shared id between user and their artwork
  const userId = req.params.userId;
  req.body["userId"] = userId;

  const item = {
    pk: "ART",
    sk: userId,
    title: req.body.title,
    category: req.body.category,
    is_approved: 0,
    votes: 0,
  };

  let putItemParams = {
    TableName: tableName,
    Item: item
  };

  const response = {
    id: req.body.userId, // Assuming 'id' is part of the body
    title: req.body.title || "title",
    category: req.body.category || "category",
    is_approved: 0, // Default to 0 if not provided
    votes: 0 // Default to 0 if not provided
  };

  try {
    let data = await ddbDocClient.send(new PutCommand(putItemParams));
    res.statusCode = 201;
    res.json(response);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: err, url: req.url, body: req.body });
  }
});

/************************************
* HTTP Patch method to approve single artwork *
************************************/

app.patch("/api/users/:userId/artworks/:userId", async function(req, res) {

  // shared id between user and their artwork
  const userId = req.params.userId;
  const approvalStatus = req.body.is_approved;

  const patchItemParams = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: userId
    },
    UpdateExpression: "set is_approved = :approvalStatus",
    ExpressionAttributeValues: {
      ":approvalStatus": approvalStatus,
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    let data = await ddbDocClient.send(new UpdateCommand(patchItemParams)); 
    const updatedItem = data.Attributes;
    const response = {
      id: updatedItem.sk,
      title: updatedItem.title,
      category: updatedItem.category,
      is_approved: updatedItem.is_approved,
      votes: updatedItem.votes
    };
    res.json(response);
  } catch (err) {
    res.json({ error: err, url: req.url });
  }
});

/************************************
* HTTP Patch method to increment vote for single artwork *
************************************/

app.patch("/api/users/:userId/artworks/:userId/vote", async function(req, res) {
  
  // shared id between user and their artwork
  const userId = req.params.userId;

  const patchItemParams = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: userId
    },
    UpdateExpression: "ADD votes :increment",
    ExpressionAttributeValues: {
      ":increment": 1,
    },
    ReturnValues: "ALL_NEW"
  }; 

  try {
    let data = await ddbDocClient.send(new UpdateCommand(patchItemParams));  
    const updatedItem = data.Attributes;
    const response = {
      id: updatedItem.sk,
      title: updatedItem.title,
      category: updatedItem.category,
      is_approved: updatedItem.is_approved,
      votes: updatedItem.votes
    };
    res.json(response);
  } catch(err) {
    res.json({ error: err, url: req.url });
  }
});

/************************************
* HTTP Delete method to remove single artwork*
************************************/

app.delete("/api/users/:userId/artworks/:userId", async function(req, res) {

  // shared id between user and their artwork
  const userId = req.params.userId;

  let removeItemParams = {
    TableName: tableName,
    Key: {
      pk: "ART",
      sk: userId
    }
  };

  try {
    let data = await ddbDocClient.send(new DeleteCommand(removeItemParams));
    res.statusCode = 204;
  } catch (err) {
    res.statusCode = 500;
    res.json({error: err, url: req.url});
  }
});



app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;
