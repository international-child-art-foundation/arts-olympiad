const ArtworkService = require("../services/artwork");

async function getArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const artwork = await ArtworkService.getArtwork(artworkId);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: "error fetching", error: error.message});
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
    res.status(500).json({message: "error creating", error: error});
  }
}

async function approveArtwork(req, res) {
  const artworkId = req.params.artworkId;
  const approvalStatus = req.body.is_approved;
  try {
    const artwork = await ArtworkService.approveArtwork(artworkId, approvalStatus);
    res.status(200).json(artwork);
  } catch(error) {
    res.status(500).json({message: "error updating artwork", error: error});
  }
}

async function voteArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const artwork = await ArtworkService.voteArtwork(artworkId);
    res.status(200).json(artwork);
  } catch(error) {
    console.error(error);
    res.status(500).json({message: "error voting for artwork", error: error.message});
  }
}

async function deleteArtwork(req, res) {
  const artworkId = req.params.artworkId;
  try {
    const response = await ArtworkService.deleteArtwork(artworkId);
    res.status(204).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error deleting artwork", error: error.message });
  }
}

async function getArtworks(req, res) {
  const queryParams = req.apiGateway.event.queryStringParameters;
  try {
    const artworks = await ArtworkService.getArtworks(queryParams);
    res.status(200).json(artworks);
  } catch(error) {
    res.status(500).json({error: error.message });
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
    res.status(500).json({ error: error.message });
  }
}



module.exports = {
  getArtwork,
  addArtwork,
  approveArtwork,
  voteArtwork,
  deleteArtwork,
  getArtworks,
  generatePresigned
};