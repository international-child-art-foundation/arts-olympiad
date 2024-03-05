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
    id: req.params.userId,
    title: req.body.title,
    sport: req.body.sport,
    location: req.body.location,
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
  const fileName = req.body.file_name;

  try {
    const { url, fields } = await ArtworkService.createUrlAndFields(fileName, userId);
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