import { format } from "date-fns";

const dates: { [key: string]: Date } = {
  // Months are 0-indexed
  competitionBegin: new Date(2027, 0, 1, 9),
  competitionEnd: new Date(2028, 6, 30, 23, 59, 59),
  winnerAnnounced: new Date(2028, 7, 1, 11),
};

export const formatDate = (dateKey: string, formatString: string): string => {
  const date = dates[dateKey];
  if (!date) {
    throw new Error(`Date with key '${dateKey}' not found.`);
  }
  return format(date, formatString);
};

export default dates;
