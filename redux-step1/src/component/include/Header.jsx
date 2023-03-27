import React from "react";

const Header = ({ number }) => {
  //props로 넘어온 값을 바로 구조분해 할당
  return (
    <>
      <div className="header_container">
        헤더영역
        <h4>{number}</h4>
      </div>
    </>
  );
};

export default Header;
