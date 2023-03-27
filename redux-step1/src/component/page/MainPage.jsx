import React from "react";

const MainPage = (props) => {
  const { number, addNumber } = props;
  return (
    <>
      <div className="main_container">
        컨텐츠 영역
        <h2>메인번호:{number}</h2>
        <button onClick={addNumber}>메인버튼이당</button>
      </div>
    </>
  );
};

export default MainPage;
