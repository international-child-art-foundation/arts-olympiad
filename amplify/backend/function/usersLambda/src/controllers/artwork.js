const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const { getUserCognitoData, handleRefreshTokenFlow } = require("../utils");
const UserModel = require("../models/user");

const ArtworkService = require("../services/artwork");

async function getArtwork(req, res) {
  const artworkSk = req.params.artworkSk;
  try {
    const artwork = await ArtworkService.getArtwork(artworkSk);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: "Error getting artwork" });
  }
}

async function addArtwork(req, res) {
  await handleRefreshTokenFlow(req, res);
  if (res.headersSent) return;
  
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userSk = userCognitoData.sub;

  const artworkData = {
    sk: userSk,
    f_name: req.body.f_name,
    age: req.body.age,
    description: req.body.description,
    sport: req.body.sport,
    location: req.body.location,
    is_ai_gen: req.body.is_ai_gen,
    model: req.body.model,
    prompt: req.body.prompt,
    file_type: req.body.file_type
  };

  try {
    // First, process the image
    const lambdaClient = new LambdaClient({ region: process.env.REGION });
    const command = new InvokeCommand({
      FunctionName: `arn:aws:lambda:us-east-1:011385746984:function:processImage-${process.env.ENV}`,
      InvocationType: "RequestResponse",
      Payload: JSON.stringify({ user_sk: userSk })
    });
    
    const { Payload } = await lambdaClient.send(command);
    const response = JSON.parse(Buffer.from(Payload));
    
    if (response.statusCode !== 200) {
      throw new Error(JSON.parse(response.body).error);
    }

    // If image processing succeeds, add artwork to the database
    let result;
    try {
      result = await ArtworkService.addArtworkAndUpdateUser(artworkData, userSk);
    } catch (error) {
      console.error("First attempt to add artwork failed. Retrying...");
      // Wait for a short time before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      result = await ArtworkService.addArtworkAndUpdateUser(artworkData, userSk);
    }

    if (!result || typeof result !== "object" || Object.keys(result).length === 0) {
      throw new Error("Adding artwork returned an invalid or empty result");
    }
    // If both operations succeed, return success
    res.status(200).json(result);

  } catch(error) {
    console.error(error);
    res.status(400).json({ error: "Error processing image or adding artwork" });
  }
}

async function approveArtwork(req, res) {
  const artworkSk = req.params.artworkSk;
  const approvalStatus = req.body.is_approved;

  // Ensure user is authenticated as a volunteer
  try {
    const {accessToken, refreshToken} = req.cookies;
    if (!accessToken && !refreshToken) {
      return res.status(401).json({ message: "User is not logged in"});
    }
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return;

    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    if (!userCognitoData || userCognitoData.nickname !== "Volunteer") {
      return res.status(403).json({ message: "User is not authenticated as a volunteer."});
    }
  } catch(error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Error during authentication"});
  }
  
  try {
    const artwork = await ArtworkService.approveArtwork(artworkSk, approvalStatus);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({error: "Error updating artwork"});
  }
}

async function incrementVoteArtwork(req, res) {
  const artworkSk = req.params.artworkSk;
  try {
    const artwork = await ArtworkService.incrementVoteArtwork(artworkSk);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({error: "Error incrementing vote for artwork"});
  }
}

async function decrementVoteArtwork(req, res) {
  const artworkSk = req.params.artworkSk;
  try {
    const artwork = await ArtworkService.decrementVoteArtwork(artworkSk);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({error: "Error decrementing vote for artwork"});
  }
}

async function voteArtwork(req, res) {
  try {
    await handleRefreshTokenFlow(req, res);
    if (res.headersSent) return;

    const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
    const userSk = userCognitoData.sub;
    const artworkSk = req.params.artworkSk;

    const result = await ArtworkService.handleVote(userSk, artworkSk);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error.message === "Cannot vote on the same artwork twice") {
      res.status(400).json({ error: "Cannot vote on the same artwork twice" });
    } else {
      res.status(500).json({ error: "Error processing vote" });
    }
  }
}

async function deleteArtwork(req, res) {
  const artworkSk = req.params.artworkSk;
  await handleRefreshTokenFlow(req, res);
  if (res.headersSent) return;
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userSk = userCognitoData.sub;
  if ((userCognitoData && userCognitoData.nickname && userCognitoData.nickname === "Volunteer") || (userSk && userSk === req.params.artworkSk)) {
    try {
      const response = await ArtworkService.deleteArtworkCompletely(artworkSk);
      res.status(204).json(response);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error deleting artwork" });
    }  
  } else {
    console.error(error);
    res.status(400).json({ error: "User is not authenticated to perform this action."});
  }
}

async function getArtworks(req, res) {
  const queryParams = req.apiGateway.event.queryStringParameters;
  try {
    const artworks = await ArtworkService.getArtworks(queryParams);
    res.status(200).json(artworks);
  } catch(error) {
    console.error(error);
    res.status(400).json({ error: "Error retrieving artworks" });
  }
}

async function generatePresigned(req, res) {
  await handleRefreshTokenFlow(req, res);
  if (res.headersSent) return;
  const userCognitoData = await getUserCognitoData(req.cookies.accessToken);
  const userSk = userCognitoData.sub;
  const userData = await UserModel.getUserBySk(userSk);
  const fileType = req.body.file_type;
  if (userData.Item.has_paid == true) {
    try {
      const { url, fields } = await ArtworkService.createUrlAndFields(userSk, fileType);
      res.status(200).json({ 
        s3_presigned_url:url, 
        fields: fields,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Failed to generate presigned URL" });
    }
  } else {
    console.error(error);
    res.status(400).json({ error: "User has not paid their entry fee."});
  }
}

module.exports = {
  getArtwork,
  addArtwork,
  approveArtwork,
  incrementVoteArtwork,
  decrementVoteArtwork,
  deleteArtwork,
  getArtworks,
  generatePresigned,
  voteArtwork
};
