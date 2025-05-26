import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Meeting", start: new Date().toISOString(), id: 1 },
    {
      title: "Lunch",
      start: new Date(Date.now() + 86400000).toISOString(),
      id: 2,
    },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter event title:");
    if (title) {
      setEvents([
        ...events,
        {
          title,
          start: info.dateStr,
          id: events.length + 1,
        },
      ]);
    }
  };

  const handleEventClick = (info) => {
    if (
      window.confirm(`Do you want to delete the event "${info.event.title}"?`)
    ) {
      setEvents(
        events.filter((event) => event.id !== parseInt(info.event.id, 10))
      );
    }
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </div>
  );
};

export default Calendar;
