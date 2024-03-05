const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware")
const bodyParser = require("body-parser")
const express = require("express")

const ArtworkController = require("./controllers/artwork");
const UserController = require("./controllers/user");

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

// s3 operations
app.get("/api/users/:userId/presigned-url", ArtworkController.generatePresigned);

app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;
