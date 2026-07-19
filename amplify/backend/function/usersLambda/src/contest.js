const CONTEST_END_TIME = new Date(Date.UTC(2026, 6, 20, 4, 0, 0));

function isVotingClosed(now = new Date()) {
  return now >= CONTEST_END_TIME;
}

module.exports = {
  CONTEST_END_TIME,
  isVotingClosed,
};
