import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
//import UseStateApp1 from "./component/1.useState/UseStateApp1";
//import UseStateApp2 from "./component/1.useState/UseStateApp2";
import UseEffectApp1 from "./component/2.useEffect/UseEffectApp1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/*     <App /> */}
    <UseEffectApp1 />
  </React.StrictMode>
);
