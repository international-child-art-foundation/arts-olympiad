const VotesModel = require("../models/votes");

let tableName = "dynamo114508ab";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

async function getTotalVotes() {
    const votes = await VotesModel.getTotalVotes()
    if (!votes.Item) {
        throw new Error("Votes not found.");
    }
    return votes.Item;
}

module.exports = {
    getTotalVotes
}