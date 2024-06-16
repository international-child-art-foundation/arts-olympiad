const VotesService = require("../services/votes");

async function getTotalVotes(req, res) {
    try {
        const votes = await VotesService.getTotalVotes();
        res.status(200).json(votes);
    } catch(error) {
        console.error(error);
        res.status(400).json({message: "error fetching total votes", error: error.message});
    }
}

module.exports = {
    getTotalVotes
}
