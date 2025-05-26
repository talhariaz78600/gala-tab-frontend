import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);

export const getServiceBookingPrice = (
  pricingModel,
  checkIn,
  checkOut,
  serviceDays,
  servicePrice
) => {
  if (
    !pricingModel ||
    !checkIn ||
    !checkOut ||
    !Array.isArray(serviceDays) ||
    serviceDays.length === 0 ||
    !Array.isArray(servicePrice) ||
    servicePrice.length === 0
  ) {
    return 0;
  }

  let totalPrice = 0;

  const servicePriceValue = servicePrice.reduce(
    (acc, curr) => acc + Number(curr.price || 0),
    0
  );

  const start = dayjs(checkIn);
  const end = dayjs(checkOut);

  let current = start.startOf("day");

  while (current.isSameOrBefore(end, "day")) {
    const dayName = current.format("dddd").toLowerCase();
    const dayInfo = serviceDays.find((sd) => sd.day === dayName);

    if (dayInfo) {
      if (pricingModel === "hourly") {
        const dayDateStr = current.format("YYYY-MM-DD");

        let serviceStart = dayjs(
          `${dayDateStr} ${dayInfo.startTime}`,
          "YYYY-MM-DD HH:mm"
        );
        let serviceEnd = dayjs(
          `${dayDateStr} ${dayInfo.endTime}`,
          "YYYY-MM-DD HH:mm"
        );

        if (serviceEnd.isBefore(serviceStart)) {
          serviceEnd = serviceEnd.add(1, "day");
        }

        let effectiveStart = serviceStart;
        if (
          dayjs(checkIn).isAfter(serviceStart) &&
          dayjs(checkIn).isBefore(serviceEnd)
        ) {
          effectiveStart = dayjs(checkIn);
        }

        let effectiveEnd = serviceEnd;
        if (
          dayjs(checkOut).isBefore(serviceEnd) &&
          dayjs(checkOut).isAfter(serviceStart)
        ) {
          effectiveEnd = dayjs(checkOut);
        }

        if (effectiveEnd.isAfter(effectiveStart)) {
          const hours = dayjs
            .duration(effectiveEnd.diff(effectiveStart))
            .asHours();
          totalPrice += hours * servicePriceValue;
        }
      } else {
        totalPrice += servicePriceValue;
      }
    }

    current = current.add(1, "day");
  }

  return parseFloat(totalPrice.toFixed(2));
};
