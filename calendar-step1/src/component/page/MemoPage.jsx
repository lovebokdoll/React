import React from "react";
import ScheduleHeader from "../include/ScheduleHeader";
import ScheduleFooter from "../include/ScheduleFooter";
import MemoList from "../memo/MemoList";
import "../css/style.css";

const MemoPage = () => {
  return (
    <div>
      <ScheduleHeader />
      <MemoList />
      <ScheduleFooter />
    </div>
  );
};

export default MemoPage;
