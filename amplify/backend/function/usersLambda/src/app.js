/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { SignUpCommand,CognitoIdentityProviderClient, AuthFlowType, InitiateAuthCommand, DeleteUserCommand, RevokeTokenCommand } = require('@aws-sdk/client-cognito-identity-provider');
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

const clientId = "26h0ul3gca5v4kevgl13dhhsur";

const { S3Client } = require("@aws-sdk/client-s3");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post"); 

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
* HTTP Post method to create user *
************************************/
app.post("/api/users", async function(req,res) { //change to api/users
  const client = new CognitoIdentityProviderClient({});
  const { email, password, f_name, l_name, location, age, g_f_name, g_l_name, voted_id, can_submit_art } = req.body;

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [] 
  });

  try {
    const signupResult = await client.send(command);

    const user = {
      pk: "USER",
      sk: signupResult.UserSub,
      id: signupResult.UserSub, // uuid created for User name if not specified
      f_name: f_name,
      l_name: l_name,
      location: location,
      age: age,
      email: email,
      ...g_f_name && { g_f_name: g_f_name }, 
      ...g_l_name && { g_l_name: g_l_name }, 
      ...voted_id && { voted_id: voted_id }, 
      can_submit_art: false 
    };

    // Create user info in db after sending credentials to cognito
    let putUserParams = {
      TableName: tableName,
      Item: user
    };

    await ddbDocClient.send(new PutCommand(putUserParams));

    const response = {
      id: signupResult.UserSub, // uuid created for User name if not specified
      f_name: f_name,
      l_name: l_name,
      location: location,
      age: age,
      email: email,
      ...g_f_name && { g_f_name: g_f_name }, 
      ...g_l_name && { g_l_name: g_l_name }, 
      ...voted_id && { voted_id: voted_id }, 
      can_submit_art: false 
    };

    res.status(201).json(response);

    
  } catch(error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
  }
});

/************************************
* HTTP Post method to login *
************************************/
app.post("/api/login", async function (req,res) {
  const client = new CognitoIdentityProviderClient({});
  const { username, password } = req.body; // change to email and password
  
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
    ClientId: clientId, //change clientId to web
  });

  try {
    const response = await client.send(command);
    res.status(200).json({ session_token: response.AuthenticationResult });
    
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
});

/************************************
* HTTP Post method to logout *
************************************/
app.post("/api/logout", async function (req,res) {
  const client = new CognitoIdentityProviderClient({});
  const refreshToken = req.headers.authentication?.split(" ")[1]; //refresh token

  const input = { // RevokeTokenRequest
    Token: refreshToken, // required
    ClientId: clientId,
  };
  const command = new RevokeTokenCommand(input); // invalidate refresh token

  try {
    const response = await client.send(command);
    res.status(200).json({ success: "success", response });
    
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
});

/************************************
* HTTP Get method to get user *
************************************/
app.get("/api/users/:userId", async function(req, res) {
  const userId = req.params.userId;
  const getUserParams = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userId
    }
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(getUserParams));
    if (data.Item) {
      const userResponse = {
        id: data.Item.id, // uuid created for User name if not specified
        f_name: data.Item.f_name,
        l_name: data.Item.l_name,
        location: data.Item.location,
        age: data.Item.age,
        email: data.Item.email,
        ...data.Item.g_f_name && { g_f_name: data.Item.g_f_name }, 
        ...data.Item.g_l_name && { g_l_name: data.Item.g_l_name }, 
        ...data.Item.voted_id && { voted_id: data.Item.voted_id }, 
        can_submit_art: data.Item.can_submit_art 
      };
      res.status(200).json(userResponse);
    } 
  } catch(error) {
    res.status(500).json({error: 'Could not load items: ' + err.message});
  }
})

/************************************
* HTTP Patch method to update user 
************************************/
app.patch("/api/users/:userId", async function(req, res) {

  const cognitoFields = [ "password" ]; // fields to be updated with cognito
  const updatableFields = ["f_name", "l_name", "location", "age", "g_f_name", "g_l_name"]; // allowed fields to be updated
  const userId = req.params.userId;
  const fieldToUpdate = Object.keys(req.body)[0];
  const valueToUpdate = req.body[fieldToUpdate];

  // invalid field
  if (!fieldToUpdate || cognitoFields.includes(fieldToUpdate) || !updatableFields.includes(fieldToUpdate)) {
    return res.status(400).json({ error: "Invalid field or field not allowed to be updated" });
  }

  // logic if field needs to be updated with cognito

  const patchUserParams = {
    TableName: tableName,
    Key: {
      pk: "USER",
      sk: userId
    },
    UpdateExpression: "set #attributeName = :newValue",
    ExpressionAttributeValues: {
      ":newValue": valueToUpdate,
    },
    ExpressionAttributeNames:{
      "#attributeName": fieldToUpdate
    },
    ReturnValues: "ALL_NEW"
  };

  try {
    let data = await ddbDocClient.send(new UpdateCommand(patchUserParams)); 
    const updatedUser = data.Attributes;
    const userResponse = {
      id: updatedUser.id, // uuid created for User name if not specified
      f_name: updatedUser.f_name,
      l_name: updatedUser.l_name,
      location: updatedUser.location,
      age: updatedUser.age,
      email: updatedUser.email,
      ...updatedUser.g_f_name && { g_f_name: updatedUser.g_f_name }, 
      ...updatedUser.g_l_name && { g_l_name: updatedUser.g_l_name }, 
      ...updatedUser.voted_id && { voted_id: updatedUser.voted_id }, 
      can_submit_art: updatedUser.id 
    };
    res.status(200).json(userResponse);
  } catch (err) {
    res.json({ error: err });
  }
});

/************************************
* HTTP Delete method to delete user *
************************************/
app.delete("/api/users/:userId", async function(req, res) {
  const client = new CognitoIdentityProviderClient({});
  const userId = req.params.userId;
  const token = req.headers.authorization?.split(" ")[1]; // Authorization: Bearer token_here

  // check if the token belongs to the same user being deleted 
  if (req.apiGateway.event.requestContext.authorizer.claims.sub !== userId) {
    return res.status(403).json({ message:"Not authorized to delete user" });
  }
  
  try {
    const command = new DeleteUserCommand({ AccessToken: token });
    await client.send(command);
    
    // remove user info from db pk="USER" 
    let deleteUserParams = {
      TableName: tableName,
      Key: {
        pk: "USER",
        sk: userId
      }
    };
    await ddbDocClient.send(new DeleteCommand(deleteUserParams));
    
    // remove artwork info from db pk="ART" 
    let deleteArtworkParams = {
      TableName: tableName,
      Key: {
        pk: "ART",
        sk: userId
      }
    };
    await ddbDocClient.send(new DeleteCommand(deleteArtworkParams));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({error: err});
  }
});

/************************************
* presignedURL 
************************************/
app.get("/api/users/:userId/presigned-url", async function(req,res) {

  const userId = req.params.userId;
  const client = new S3Client();
  const Bucket = "artsolympiadf677eab9a54848dc8788ee9110a11839185846-staging"; // todo: load as env variable

  let fileName;

  if (req.apiGateway.event.queryStringParameters && req.apiGateway.event.queryStringParameters.fileName) {
    fileName = req.apiGateway.event.queryStringParameters.fileName;
  }

  const Key = fileName;
  const Expires = 900;
  const Fields = {
    "x-amz-meta-user-id": userId,
  };
  const Conditions = [
    ["starts-with", "$key", Key],
    ["content-length-range", 0, 1024 * 1024 * 5],
    ["eq", "$x-amz-meta-user-id", userId],
  ];


  const { url, fields } = await createPresignedPost(client, {
    Bucket,
    Conditions,
    Fields,
    Key,
    Expires,
});
  
  console.log(url);
  console.log(fields);

  try {
    res.status(200).json({ s3_presigned_url:url, fields: fields });
  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error: error.message });
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
