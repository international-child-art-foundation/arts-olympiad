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
    id: artworkData.userId,
    f_name: artworkData.f_name,
    l_name: artworkData.l_name,
    description: artworkData.description,
    sport: artworkData.sport,
    location: artworkData.location,
    timestamp: timestamp,
    is_approved: false,
    votes: 0,
    is_ai_gen: artworkData.is_ai_gen,
    model: artworkData.model,
    prompt: artworkData.prompt,
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

async function incrementVoteArtwork(artworkId) {
  const artwork = await ArtworkModel.incrementVoteArtworkById(artworkId);
  return formatArtwork(artwork.Attributes);
}

async function decrementVoteArtwork(artworkId) {
  const artwork = await ArtworkModel.decrementVoteArtworkById(artworkId);
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
  return results;
}

async function createUrlAndFields(userId, fileType="jpg") {
  const client = s3Client;
  const Bucket = `artsolympiadf677eab9a54848dc8788ee9110a11839185846-${process.env.ENV}`;

  const Key = `${userId}/initial.${fileType}`;
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
    f_name: artwork.f_name,
    l_name: artwork.l_name,
    age: artwork.age,
    description: artwork.description,
    sport: artwork.sport,
    location: artwork.location,
    is_approved: artwork.is_approved,
    votes: artwork.votes,
    is_ai_gen: artwork.is_ai_gen,
    model: artwork.model,
    prompt: artwork.prompt,
  };
}

module.exports = {
  getArtwork,
  addArtwork,
  deleteArtwork,
  incrementVoteArtwork,
  decrementVoteArtwork,
  approveArtwork,
  getArtworks,
  createUrlAndFields
};