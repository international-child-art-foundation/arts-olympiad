const ArtworkModel = require("../models/artwork");
const UserModel = require("../models/user");

const { s3Client } = require("../lib/s3Client");
const { createPresignedPost } = require("@aws-sdk/s3-presigned-post"); 

// let tableName = "dynamo114508ab";
let tableName = "dynamo22205621";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

async function getArtwork(artworkSk) {
  const artwork = await ArtworkModel.getArtworkById(artworkSk);
  if (!artwork.Item) {
    throw new Error(`Artwork with ID ${artworkSk} not found.`);
  }
  return formatArtwork(artwork.Item);
}

async function addArtwork(artworkData) {
  const timestamp = (Date.now() / 1000).toFixed(2);
  const item = {
    pk: "ART",
    sk: artworkData.sk,
    gsi1pk: "false",
    gsi1sk: artworkData.sk,
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
    file_type: artworkData.file_type
  };
  await ArtworkModel.createArtwork(item);
  return formatArtwork(item);
}

async function addArtworkAndUpdateUser(artworkData, userSk) {
  const timestamp = (Date.now() / 1000).toFixed(2);
  const item = {
    pk: "ART",
    sk: artworkData.sk,
    gsi1pk: "false",
    gsi1sk: artworkData.sk,
    f_name: artworkData.f_name,
    age: artworkData.age,
    description: artworkData.description,
    sport: artworkData.sport,
    location: artworkData.location,
    timestamp: timestamp,
    is_approved: false,
    votes: 0,
    is_ai_gen: artworkData.is_ai_gen,
    model: artworkData.model,
    prompt: artworkData.prompt,
    file_type: artworkData.file_type
  };

  const result = await ArtworkModel.createArtworkAndUpdateUser(item, userSk);
  return {
    artwork: formatArtwork(result.artwork),
    userUpdated: result.userUpdated
  };
}

async function handleVote(userSk, artworkSk) {
  const userData = await UserModel.getUserBySk(userSk);

  if (!userData) {
    throw new Error("User not found");
  }

  if (userData.Item.voted_sk) {
    if (userData.Item.voted_sk === artworkSk) {
      // User is trying to vote for the same artwork again
      throw new Error("Cannot vote on the same artwork twice");
    } else {
      // User is changing their vote
      return await ArtworkModel.changeVote(userSk, userData.Item.voted_sk, artworkSk);
    }
  } else {
    // User doesn't have an active vote
    return await ArtworkModel.addNewVote(userSk, artworkSk);
  }
}

async function deleteArtwork(artworkSk) {
  try {
    await ArtworkModel.deleteArtworkById(artworkSk);
    return {message: "successfully deleted"};
  } catch (error) {
    console.log(error);
  }
}

// Does not currently invalidate CloudFront URLs. 
async function deleteArtworkCompletely(artworkSk) {
  try {
    await ArtworkModel.deleteArtworkAndFiles(artworkSk);
    return {message: "successfully deleted"};
  } catch(error) {
    console.log(error);
  }
}

async function incrementVoteArtwork(artworkSk) {
  const artwork = await ArtworkModel.incrementVoteArtworkById(artworkSk);
  return formatArtwork(artwork.Attributes);
}

async function decrementVoteArtwork(artworkSk) {
  const artwork = await ArtworkModel.decrementVoteArtworkById(artworkSk);
  return formatArtwork(artwork.Attributes);
}

async function approveArtwork(artworkSk, approvalStatus) {
  const artwork = await ArtworkModel.approveArtworkById(artworkSk, approvalStatus);
  return formatArtwork(artwork.Attributes);
}

async function getArtworks(queryParams) {
  const is_approved = queryParams?.is_approved ?? "true";
  const sort_key  = queryParams?.sort_by ?? "votes";
  const order_by = queryParams?.order_by ?? "descending";

  const query = {
    TableName: tableName,
    ProjectionExpression: "sk, description, sport, #loc, is_approved, votes, f_name, l_name, age, is_ai_gen, model, prompt, file_type, #time_stamp",
    ExpressionAttributeNames: { "#loc": "location" , "#time_stamp": "timestamp"},
    IndexName: "gsi1-index",
    KeyConditionExpression: "gsi1pk = :v_is_approved",
    ExpressionAttributeValues: {":v_is_approved" : is_approved},
    // Limit: limit,
    // ScanIndexForward: scanIndexForward
  }

  let items = await ArtworkModel.queryArtworks(query);

  if (order_by == "descending") {
    items.sort((a, b) => b[sort_key] - a[sort_key]);
  } else {
    items.sort((a, b) => a[sort_key] - b[sort_key]);
  }

  return items;
}

async function createUrlAndFields(userSk, fileType="jpg") {
  const client = s3Client;
  const Bucket = `artsolympiadf677eab9a54848dc8788ee9110a11839185846-${process.env.ENV}`;

  const Key = `${userSk}/initial.${fileType}`;
  const Expires = 900;
  const Fields = {
    "x-amz-meta-user-id": userSk,
  };
  const Conditions = [
    ["starts-with", "$key", Key],
    ["content-length-range", 0, 1024 * 1024 * 5],
    ["eq", "$x-amz-meta-user-id", userSk],
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

function formatArtwork(artwork) { 
  return {
    sk: artwork.sk,
    f_name: artwork.f_name,
    age: artwork.age,
    description: artwork.description,
    sport: artwork.sport,
    location: artwork.location,
    is_approved: artwork.is_approved,
    votes: artwork.votes,
    is_ai_gen: artwork.is_ai_gen,
    model: artwork.model,
    prompt: artwork.prompt,
    file_type: artwork.file_type,
    timestamp: artwork.timestamp
  };
}

module.exports = {
  getArtwork,
  addArtwork,
  deleteArtwork,
  deleteArtworkCompletely,
  incrementVoteArtwork,
  decrementVoteArtwork,
  approveArtwork,
  getArtworks,
  createUrlAndFields,
  addArtworkAndUpdateUser,
  handleVote
};