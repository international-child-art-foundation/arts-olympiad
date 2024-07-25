import { format } from "date-fns";

const dates: { [key: string]: Date } = {
  // Months are 0-indexed
  competitionBegin: new Date(2024, 6, 25),
  competitionEnd: new Date(2024, 8, 30),
  winnerAnnounced: new Date(2024, 9, 4)
};

export const formatDate = (dateKey: string, formatString: string): string => {
  const date = dates[dateKey];
  if (!date) {
    throw new Error(`Date with key '${dateKey}' not found.`);
  }
  return format(date, formatString);
};

export default dates;
