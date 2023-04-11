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
  background-color: #daf5ff;
`;

const App = ({ FileInput }) => {
  return (
    <>
      <AppDiv>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/manager"
            element={<CardManager FileInput={FileInput} />}
          />
        </Routes>
      </AppDiv>
    </>
  );
};

export default App;
