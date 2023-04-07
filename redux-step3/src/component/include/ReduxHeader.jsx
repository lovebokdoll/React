import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginGoogle } from "../../service/authLogic";

const ReduxHeader = () => {
  const navigate = useNavigate();
  const { userAuth } = useSelector((store) => store);
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(window.localStorage.getItem("userId"));
  }, []);
  const handleGoogle = async () => {
    console.log("구글버튼 클릭");
    const result = await loginGoogle(userAuth.auth, userAuth.googleProvider);
    console.log(result);
    if (result.uid) {
      //로컬스토리지나 세션스토리지에 처리된 결과가 화면에 반영되려면 페이지 리로딩이 필요함
      //navigate훅으로 처리 안됨
      window.localStorage.setItem("userId", result.uid);
      window.location.reload();
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userId");
    console.log("로그아웃");
    window.location.reload();
  };

  return (
    <>
      <div className="sub-container">
        <h2>헤더섹션</h2>
        {userId ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleGoogle}>Google</button>
        )}
      </div>
      <hr />
    </>
  );
};

export default ReduxHeader;
