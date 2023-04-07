import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./component/page/HomePage";

function ReduxApp() {
  return (
    <>
      <Routes>
        <Route path="/" exact="true" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default ReduxApp;
