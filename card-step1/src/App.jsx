import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import CardManager from "./components/page/CardManager";
import Login from "./components/login/Login";

const AppDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-item: center;
  background-color:#DAF5FF;
`;

const App = () => {
  return (
    <>
      <AppDiv>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<CardManager />} />
        </Routes>
      </AppDiv>
    </>
  );
};

export default App;
