import { format } from "date-fns";

const dates: { [key: string]: Date } = {
  // Months are 0-indexed
  competitionBegin: new Date(2026, 5, 11, 9),
  competitionEnd: new Date(2026, 6, 18, 24),
  winnerAnnounced: new Date(2026, 6, 27, 11),
};

export const formatDate = (dateKey: string, formatString: string): string => {
  const date = dates[dateKey];
  if (!date) {
    throw new Error(`Date with key '${dateKey}' not found.`);
  }
  return format(date, formatString);
};

export default dates;
