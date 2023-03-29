import React from "react";

import { useSelector } from "react-redux";

const ReduxMainPage = () => {
  const number = useSelector((state) => state.number);
  const depts = useSelector((store) => store.depts);
  return (
    <>
      <div className="main_container">
        <h4>컨텐츠 영역</h4>
        <hr />
        <h3>번호:{number}</h3>
        {/*map을 사용하여 가져오기*/}
        {depts &&
          depts.map((dept, index) => (
            <h4 key={index}>
              {dept.DEPTNO}
              {dept.DNAME}
              {dept.LOC}
            </h4>
          ))}
      </div>
    </>
  );
};

export default ReduxMainPage;
