const CONTEST_END_TIME = new Date(2026, 6, 19, 23, 59, 59);

function isVotingClosed(now = new Date()) {
  return now >= CONTEST_END_TIME;
}

module.exports = {
  CONTEST_END_TIME,
  isVotingClosed,
};
