import React from "react";
import { useSelector } from "react-redux";

const ReduxMainPage = () => {
  const number = useSelector((state) => state.number);

  return (
    <>
      <div className="main_container">
        <h4>컨텐츠 영역</h4>
        <hr />
        <h3>{number}</h3>
      </div>
    </>
  );
};

export default ReduxMainPage;
