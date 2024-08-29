const VotesService = require("../services/votes");

async function getTotalVotes(req, res) {
  try {
    const votes = await VotesService.getTotalVotes();
    res.status(200).json(votes);
  } catch(error) {
    console.error(error);
    res.status(400).json({error: "error fetching total votes"});
  }
}

module.exports = {
  getTotalVotes
};
