import React from "react";
import guestImg from "../../assets/img/guest-img2.png";
import teamIcon from "../../assets/img/teamIcon.png";
import dollorIcon from "../../assets/img/dollorIcon.png";
import clockIcon from "../../assets/img/clockIcon.png";
import dayjs from "dayjs";

export default function GuestInfoDetails({ bookingData }) {
  const checkIn = dayjs(bookingData.checkIn);
  const checkOut = dayjs(bookingData.checkOut);

  const durationInHours = checkOut.diff(checkIn, "hour");
  const durationInMinutes = checkOut.diff(checkIn, "minute");

  const formattedduration = `${durationInHours} hour(s) ${
    durationInMinutes % 60
  } minute(s)`;

  const profilPicture = bookingData?.user?.profilePicture;

  const guestInfo = [
    {
      title: "Guest Name",
      img: profilPicture || guestImg,
      name: `${bookingData?.user?.fullName} `,
    },
    { title: "Total Guest", img: teamIcon, name: `${bookingData?.guests}` },
    {
      title: "Total Time",
      img: clockIcon,
      name: formattedduration || "0hr 0min",
    },
    { title: "Price", img: dollorIcon, name: `${bookingData?.totalPrice}` },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-x-16 gap-y-4">
        {guestInfo.map((guest, index) => (
          <div key={index} className="flex flex-col justify-between">
            <p className="text-lg font-semibold">{guest.title}</p>
            <div className="flex items-center mt-3">
              <img
                className={`object-contain me-2 ${
                  index === 0
                    ? "rounded-full object-cover size-12"
                    : "size-6 dark:invert"
                }`}
                src={guest.img}
                alt={guest.name}
              />
              <p className="text-[14px] leading-normal font-medium">
                {guest.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="mt-8">
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
            <div>
                <label className="text-[#0C1421] ps-3" htmlFor="Welcomemessage">Welcome Message</label>
                <textarea className="w-full border p-3 rounded-[10px] border-[#D4D7E3] resize-none focus:outline-none" rows={4} name="Welcomemessage" id="Welcomemessage" placeholder="Type Here"></textarea>
            </div>
            <div>
                <label className="text-[#0C1421] ps-3" htmlFor="InternalNotes">Internal Notes</label>
                <textarea className="w-full border p-3 rounded-[10px] border-[#D4D7E3] resize-none focus:outline-none" rows={4} name="InternalNotes" id="InternalNotes" placeholder="Type Here"></textarea>
            </div>
        </div>
      </div> */}
    </div>
  );
}
