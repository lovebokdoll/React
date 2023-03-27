import React from "react";
import { useDispatch } from "react-redux";
import { increase } from "../../redux/store";

const ReduxFooter = () => {
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    e.preventDefault(); //이벤트버블링차단
    dispatch(increase('김춘추'));
  };
  return (
    <>
      <div className="footer_container">
        <h3>리덕스푸터영역</h3>
        <button onClick={handleAdd}>뭐뭐</button>
      </div>
    </>
  );
};

export default ReduxFooter;
