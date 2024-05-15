const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");
const ArtworkService = require("../services/artwork");

async function getArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const artwork = await ArtworkService.getArtwork(artworkId);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({message: "Error getting artwork", error: error.message});
  }
}

async function addArtwork(req, res) {
  const artworkData = {
    id: req.body.id,
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    age: req.body.age,
    title: req.body.title,
    sport: req.body.sport,
    location: req.body.location,
    is_ai_gen: req.body.is_ai_gen,
    model: req.body.model,
    prompt: req.body.prompt,
  };
  try {
    const artwork = await ArtworkService.addArtwork(artworkData);
    res.status(200).json(artwork);
  } catch(error) {
    res.status(400).json({message: "error creating", error: error});
  }
}

async function approveArtwork(req, res) {
  const artworkId = req.params.artworkId;
  const approvalStatus = req.body.is_approved;

  // process images before approving artwork
  try {
    const lambdaClient = new LambdaClient({ region: process.env.REGION });
    const command = new InvokeCommand({
      FunctionName: `arn:aws:lambda:us-east-1:011385746984:function:processImage-${process.env.ENV}`,
      InvocationType: 'RequestResponse', // for synchronous execution
      Payload: JSON.stringify({ user_id: artworkId }) // artwork id is the same as user id
    });
    const { Payload } = await lambdaClient.send(command);
    const response = JSON.parse(Buffer.from(Payload));
    console.log(response);
    if (response.statusCode != 200) {
      throw new Error(JSON.parse(response.body).error);
    };

    const artwork = await ArtworkService.approveArtwork(artworkId, approvalStatus);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({message: "Error updating artwork", error: error});
  }
}

async function incrementVoteArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const artwork = await ArtworkService.incrementVoteArtwork(artworkId);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({message: "Error incrementing vote for artwork", error: error.message});
  }
}

async function decrementVoteArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const artwork = await ArtworkService.decrementVoteArtwork(artworkId);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(400).json({message: "Error decrementing vote for artwork", error: error.message});
  }
}

async function deleteArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const response = await ArtworkService.deleteArtwork(artworkId);
    res.status(204).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error deleting artwork", error: error.message });
  }
}

async function getArtworks(req, res) {
  const queryParams = req.apiGateway.event.queryStringParameters;
  try {
    const artworks = await ArtworkService.getArtworks(queryParams);
    res.status(200).json(artworks);
  } catch(error) {
    res.status(400).json({error: error.message });
  }
}

async function generatePresigned(req, res) {
  const userId = req.params.userId;
  const fileType = req.body.file_type;

  try {
    const { url, fields } = await ArtworkService.createUrlAndFields(userId, fileType);
    res.status(200).json({ 
      s3_presigned_url:url, 
      fields: fields 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  generatePresigned
};
