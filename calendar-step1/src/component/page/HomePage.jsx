import React from "react";
import ScheduleHeader from "../include/ScheduleHeader";
import { useNavigate } from "react-router";
import { ContainerDiv, FormDiv, HeaderDiv } from "../style/FormStyle";
import ScheduleFooter from "../include/ScheduleFooter";

const HomePage = () => {
  const member = window.localStorage.getItem("member");
  console.log(JSON.parse(member));
  const jsonDoc = JSON.parse(member);
  const navigete = useNavigate();

  return (
    <>
      <ContainerDiv>
        <ScheduleHeader />
        <HeaderDiv>
          <h1 style={{ marginLeft: "10px" }}> 다희블로그</h1>
        </HeaderDiv>
        <FormDiv>
          <div>이벤트존</div>
          <hr style={{ height: "2px" }} />
          <div>추천수업존</div>
          <hr style={{ height: "2px" }} />
          <div>지도화면</div>
          <div>카카오맵존</div>
          <hr style={{ height: "2px" }} />
        </FormDiv>
        <ScheduleFooter />
      </ContainerDiv>
    </>
  );
};

export default HomePage;
