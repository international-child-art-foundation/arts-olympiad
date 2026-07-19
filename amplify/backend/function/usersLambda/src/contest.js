const CONTEST_END_TIME = new Date(2026, 6, 18, 24);

function isVotingClosed(now = new Date()) {
  return now >= CONTEST_END_TIME;
}

module.exports = {
  CONTEST_END_TIME,
  isVotingClosed,
};
