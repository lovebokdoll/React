import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HackerApp from "./HackerApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    {/*     <App /> */}
    <HackerApp />
  </React.Fragment>
);
/* hackerNews데이터를 axios로 가져올 때 React.StrictMode가 있으면 두번 요청이 발생함
  그래서 빈 태그로 변경함
  여기서 빈 태그는 Fragement를 의미한다 */
