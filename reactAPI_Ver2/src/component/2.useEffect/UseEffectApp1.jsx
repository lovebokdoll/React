import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Sub1 from "./Sub1";

const UseEffectApp1 = () => {
  console.log("UseEffectApp1");
  const [data, setData] = useState(0);
  let plus = () => {
    console.log("plus");
    //let resData = 5;
    setData(data + 1);
  };
  useEffect(() => {
    console.log("effect");
  }, [data]);
  return (
    <>
      <h3>데이터:{data}</h3>
      <Button onClick={plus}>더하기이이이이이</Button>
      <Sub1 />
    </>
  );
};

export default UseEffectApp1;
