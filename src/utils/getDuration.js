import dayjs from "dayjs";

export const getDuration = (checkIn, checkOut) => {
  const start = dayjs(checkIn);
  const end = dayjs(checkOut);

  const totalMinutes = end.diff(start, "minute");
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  let parts = [];
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes || parts.length === 0)
    parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);

  return parts.join(" ");
};
