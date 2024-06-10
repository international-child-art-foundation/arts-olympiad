import { format } from "date-fns";

const dates: { [key: string]: Date } = {
  competitionBegin: new Date(2024, 6, 15),
  competitionEnd: new Date(2024, 7, 15), // December 25, 2024
  winnerAnnounced: new Date(2024, 7, 20)
};

export const formatDate = (dateKey: string, formatString: string): string => {
  const date = dates[dateKey];
  if (!date) {
    throw new Error(`Date with key '${dateKey}' not found.`);
  }
  return format(date, formatString);
};

export default dates;
