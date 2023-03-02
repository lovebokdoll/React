import { Button } from "react-bootstrap";
import React, { useState } from "react";

const UseStateApp2 = () => {
  const [emps, setEmps] = useState([{ empno: 8000, ename: "다쿠다쿠" }]);
  const getEmpList = () => {
    console.log("getEmpList");
    let samples = [
      { empno: 7566, ename: "정다희" },
      { empno: 7499, ename: "윤호재" },
      { empno: 7999, ename: "권양아" },
    ];
    setEmps([...emps, ...samples]);
    // const other = samples.concat({ empno: 7777, ename: "정복돌" });
    //console.log(other);
    // setEmps([...samples, { empno: 7777, ename: "정복돌" }]);
  };

  return (
    <>
      <h2>ustState복습-2</h2>
      <Button onClick={getEmpList}>사원조회</Button>
      {emps.map((sample, index) => (
        <h3 key={index}>
          {sample.empno}
          {sample.ename}
        </h3>
      ))}
    </>
  );
};

export default UseStateApp2;
/* 
상태값이 변할 때 마다 렌더링이 되도록 하고 싶다면 useState훅을 사용할 것.
깊은복사 : 객체의 실제값을 복사하는 것 - 원본을 바꿔도 복사본은 바뀌지 않음
얕은복사 : 객체의 주소값을 복사하는 것 - 원본을 바꾸면 복사본도 바뀜

sample에 push함수를 통해서 원소를 추가하면 
버튼을 누를 때마다 sample은 증가하지만 렌더링은 새로되지 않는다.
sample의 주소번지가 바뀌지 않았기 때문에 실제 배열의 원소는 계속 증가하지만
return이 호출되지 않는다.

*/
