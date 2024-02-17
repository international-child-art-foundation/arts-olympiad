/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
const bodyParser = require("body-parser")
const express = require("express")

const ArtworkController = require("./controllers/artwork");
const UserController = require("./controllers/user");

let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

// const clientId = "26h0ul3gca5v4kevgl13dhhsur";

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


app.post("/api/users", UserController.registerUser);
app.post("/api/login", UserController.login);
app.post("/api/verify", UserController.verifyUser);
app.get("/api/users/:userId", UserController.getUser);
app.patch("/api/users/:userId", UserController.updateUser);
app.delete("/api/users/:userId", UserController.deleteUser);


app.post("/api/users/:userId/artworks", ArtworkController.addArtwork);
app.get("/api/users/:userId/artworks/:artworkId", ArtworkController.getArtwork);
app.patch("/api/users/:userId/artworks/:artworkId", ArtworkController.approveArtwork);
app.patch("/api/users/:userId/artworks/:artworkId/vote", ArtworkController.voteArtwork);
app.delete("/api/users/:userId/artworks/:artworkId", ArtworkController.deleteArtwork);
app.get("/api/artworks", ArtworkController.getArtworks);

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







app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;
