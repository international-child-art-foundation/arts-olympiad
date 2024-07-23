const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");

const ArtworkController = require("./controllers/artwork");
const UserController = require("./controllers/user");
const VotesController = require("./controllers/votes");
const StripeController = require("./controllers/stripe");

const {
  loginUserValidator, registerUserValidator, verifyUserValidator, updateUserValidator,
  generatePresignedValidator, addArtworkValidator, approveArtworkValidator, validationMiddleware,
  forgotPasswordValidator, volunteerUpdateUserValidator, confirmForgotPasswordValidator, resendVerificationValidator,
  refundUserValidator, getArtworkValidator, deleteArtworkValidator, voteArtworkValidator
} = require("./validators");

const STRIPE_WEBHOOK_IPS = [
  "3.18.12.63",  "3.130.192.231",
  "13.235.14.237",  "13.235.122.149",
  "18.211.135.69",  "35.154.171.200",
  "52.15.183.38",  "54.88.130.119",
  "54.88.130.237",  "54.187.174.169",
  "54.187.205.235",  "54.187.216.72"
];

// declare a new express app
const app = express();

// Register this endpoint before adding bodyParser and CORS, as they cause errors
app.post("/api/stripe-webhook", (req, res, next) => {
  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : req.ip;

  if (!STRIPE_WEBHOOK_IPS.includes(ip)) {
    console.error("IP not found in list: " + ip);
    return res.status(403).send("Forbidden");
  }
  next();
}, express.raw({type: "application/json"}), StripeController.handleWebhook);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(awsServerlessExpressMiddleware.eventContext());

// Limit size of requests to the API
app.use(express.json({ limit: "15kb" }));

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/api/users", registerUserValidator, validationMiddleware, UserController.registerUser);
app.post("/api/login", loginUserValidator, validationMiddleware, UserController.login);
app.post("/api/logout", UserController.logout);
app.post("/api/verify", verifyUserValidator, validationMiddleware, UserController.verifyUser);
app.get("/api/users", UserController.getUser);
app.patch("/api/users", updateUserValidator, validationMiddleware, UserController.updateUser);
app.delete("/api/users", UserController.deleteUser);
app.post("/api/users/presigned-url", generatePresignedValidator, validationMiddleware, ArtworkController.generatePresigned);
app.post("/api/forgot-password", forgotPasswordValidator, validationMiddleware, UserController.forgotPassword);
app.post("/api/confirm-forgot-password", confirmForgotPasswordValidator, validationMiddleware, UserController.confirmForgotPassword);
app.get("/api/auth-status", UserController.getAuthStatus);
app.get("/api/voted", UserController.getUserVoted);
app.post("/api/resend-verification", resendVerificationValidator, validationMiddleware, UserController.sendVerificationEmail);
app.post("/api/refund-user/:userSk", refundUserValidator, validationMiddleware, UserController.refundUser);
app.delete("/api/users/user-delete-account", UserController.userDeleteAccount);

app.patch("/api/volunteer/update-user/:userSk", volunteerUpdateUserValidator, validationMiddleware, UserController.volunteerUpdateUser);
app.get("/api/volunteer/auth-status", UserController.getVolunteerAuthStatus);

app.get("/api/artworks", ArtworkController.getArtworks);
app.post("/api/artworks", addArtworkValidator, validationMiddleware, ArtworkController.addArtwork);
app.get("/api/artworks/:artworkSk", getArtworkValidator, validationMiddleware, ArtworkController.getArtwork);
app.patch("/api/artworks/:artworkSk", approveArtworkValidator, validationMiddleware, ArtworkController.approveArtwork);
app.delete("/api/artworks/:artworkSk", deleteArtworkValidator, validationMiddleware, ArtworkController.deleteArtwork);
// app.patch("/api/artworks/:artworkSk/votes/increment", ArtworkController.incrementVoteArtwork);
// app.patch("/api/artworks/:artworkSk/votes/decrement", ArtworkController.decrementVoteArtwork);
app.patch("/api/vote/:artworkSk", voteArtworkValidator, validationMiddleware, ArtworkController.voteArtwork);

app.get("/api/votes", VotesController.getTotalVotes);


app.listen(3000, function() {
  console.log("App started");
});

module.exports = app;
