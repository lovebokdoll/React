import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const SechedulePage = () => {
  const [memoList, setMemoList] = useState([]);
  useEffect(() => {
    axios.get("/schedule.json").then((res) => {
      console.log(res.data);
      setMemoList(res.data);
    });
  }, []);
  const handleDateClick = (arg) => {
    console.log(arg.dateStr);
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={memoList}
        height={"100vh"}
        dateClick={handleDateClick}
      />
    </>
  );
};

export default SechedulePage;
