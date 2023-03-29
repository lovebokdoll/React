import React from "react";
import { useSelector } from "react-redux";

const ReduxHeader = () => {
  const empVO = useSelector((store) => store.empVO);
  return (
    <>
      리덕스헤더영역
      <hr />
      <h3>{empVO && `사원번호:${empVO.empno} 사원명:${empVO.ename}`}</h3>
    </>
  );
};

export default ReduxHeader;
