import dates from "./dates";

const contestStartTime = new Date(dates.competitionBegin);
contestStartTime.setHours(12, 0, 0);

const contestEndTime = new Date(dates.competitionEnd);
contestEndTime.setHours(23, 59, 59);

export { contestStartTime, contestEndTime };
