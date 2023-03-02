import { Button } from "react-bootstrap";
import React, { useState } from "react";

const UseStateApp1 = () => {
  console.log("useStateApp1"); //무조건 한번 출력
  let nums = [1, 2, 3];
  //상태가 변하면 UI에 반영되는것이 리액트임
  const [result2, setResult2] = useState(() => {
    console.log("useState1"); //딱 한번만 출력
    return 0;
  });
  let result = 0;
  const Plus = () => {
    console.log(`plus${result}`);
    result++;
    //setResult2가 실행될 때 다시 return이 실행됨(다시그려짐 - 그러니까 1씩 증가되는 숫자를 확인가능함)
    setResult2(result2 + 1);
  };
  return (
    <>
      <h2>ustState복습-1</h2>
      <Button onClick={Plus}>더하기</Button>
      <h2>덧셈 결과 출력{result}</h2>
      <h2>덧셈 결과 출력{result2}</h2>
      <hr />
      {nums.map((num, index) => (
        <h3 key={index}>{num}</h3>
      ))}
      <hr />
    </>
  );
};

export default UseStateApp1;
/* 
상태값이 변할 때 마다 렌더링이 되도록 하고 싶다면 useState훅을 사용할 것.

*/
