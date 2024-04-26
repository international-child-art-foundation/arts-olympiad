const ArtworkModel = require("../models/artwork");

const { s3Client } = require("../lib/s3Client");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post"); 

let tableName = "dynamo114508ab";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

async function getArtwork(artworkId) {
  const artwork = await ArtworkModel.getArtworkById(artworkId);
  if (!artwork.Item) {
    throw new Error(`Artwork with ID ${artworkId} not found.`);
  }
  // return artwork.Item;
  return formatArtwork(artwork.Item);
}

async function addArtwork(artworkData) {
  const timestamp = (Date.now() / 1000).toFixed(2);
  const item = {
    pk: "ART",
    sk: artworkData.id,
    id: artworkData.id,
    gsi1pk: 0,
    gsi1sk: artworkData.id,
    title: artworkData.title,
    sport: artworkData.sport,
    location: artworkData.location,
    timestamp: timestamp,
    is_approved: false,
    votes: 0,
  };
  await ArtworkModel.createArtwork(item);
  return formatArtwork(item);
}

async function deleteArtwork(artworkId) {
  try {
    await ArtworkModel.deleteArtworkById(artworkId);
    return {message: "successfully deleted"};
  } catch (error) {
    console.log(error);
  }
}

async function voteArtwork(artworkId) {
  const artwork = await ArtworkModel.voteArtworkById(artworkId);
  return formatArtwork(artwork.Attributes);
}

async function approveArtwork(artworkId, approvalStatus) {
  const artwork = await ArtworkModel.approveArtworkById(artworkId, approvalStatus);
  return formatArtwork(artwork.Attributes);
}

async function getArtworks(queryParams) {
  const parameters = parseQueryParams(queryParams);
  const overallLimit = 20;
  const totalQueryCalls = calculateTotalQueryCalls(parameters);
  const limitPerQuery = Math.floor(overallLimit / totalQueryCalls);
  const inputs = ArtworkModel.buildQueryInputs(parameters, limitPerQuery);
  const results = [];

  for (const input of inputs) {
    const { items: artworks } = await ArtworkModel.queryArtworks(input);
    results.push(...artworks);
  }
  // console.log(results);
  return results;
}

async function createUrlAndFields(fileName, userId) {
  const client = s3Client;
  const Bucket = "artsolympiadf677eab9a54848dc8788ee9110a11839185846-staging"; // todo: load as env variable

  const Key = "test/" + fileName; // change
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

  return { url, fields };
}

// helper functions
function parseQueryParams(queryParams) {
  let parameters = {};
  for (const [key,val] of Object.entries(queryParams)) {
    parameters[key] = val.trim().split(",").filter(Boolean);
  }
  return parameters;
}

function calculateTotalQueryCalls(params) {
  let totalCombinations = 1;
  if (params.is_approved && params.is_approved.length) {
    totalCombinations = 1;
  } else if (params.sport && params.location) {
    totalCombinations = params.sport.length * params.location.length;
  } else if (params.sport || params.location) {
    totalCombinations = Math.max(params.sport?.length || 1, params.location?.length || 1);
  }
  return totalCombinations;
}

function formatArtwork(artwork) { 
  return {
    id: artwork.id,
    title: artwork.title,
    sport: artwork.sport,
    location: artwork.location,
    is_approved: artwork.is_approved,
    votes: artwork.votes,
  };
}

module.exports = {
  getArtwork,
  addArtwork,
  deleteArtwork,
  voteArtwork,
  approveArtwork,
  getArtworks,
  createUrlAndFields
};