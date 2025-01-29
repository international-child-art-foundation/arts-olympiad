import { format } from "date-fns";

const dates: { [key: string]: Date } = {
  // Months are 0-indexed
  competitionBegin: new Date(2024, 6, 26),
  competitionEnd: new Date(2025, 11, 31),
  winnerAnnounced: new Date(2026, 0, 5)
};

export const formatDate = (dateKey: string, formatString: string): string => {
  const date = dates[dateKey];
  if (!date) {
    throw new Error(`Date with key '${dateKey}' not found.`);
  }
  return format(date, formatString);
};

export default dates;
