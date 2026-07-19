import dates from "../../mock/dates";
import { ContestState } from "../../mock/contestState";

export function getContestStartTime() {
  const contestStartTime = new Date(dates.competitionBegin);
  contestStartTime.setHours(12, 0, 0, 0);
  return contestStartTime;
}

export function getContestEndTime() {
  return new Date(Date.UTC(2026, 6, 20, 4, 0, 0));
}

export function getContestState(now = new Date()): ContestState {
  const contestStartTime = getContestStartTime();
  const contestEndTime = getContestEndTime();

  if (now < contestStartTime) return ContestState.Inactive;
  if (now >= contestEndTime) return ContestState.Complete;
  return ContestState.Active;
}

export function isVotingClosed(now = new Date()) {
  return getContestState(now) === ContestState.Complete;
}
