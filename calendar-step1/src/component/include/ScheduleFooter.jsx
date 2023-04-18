import React from "react";
import { Navbar } from "react-bootstrap";

const ScheduleFooter = () => {
  return (
    <>
      <Navbar
        fixed="bottom"
        className="navbar navbar-expand-sm bg-light justify-content-center"
        bg="dark"
        style={{ color: "white" }}
      >
        다이어리 Copyright&copy;2023
      </Navbar>
    </>
  );
};

export default ScheduleFooter;
