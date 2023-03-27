import { useState } from "react";
import "./App.css";
import Footer from "./component/include/Footer";
import Header from "./component/include/Header";
import MainPage from "./component/page/MainPage";

function App() {
  const [number, setNumber] = useState(0);
  const addNumber = () => {
    setNumber(number + 1);
    console.log("+1합니다여");
  };
  return (
    <>
      <div className="container">
        <Header number={number} />
        <MainPage number={number} addNumber={addNumber} />
        <Footer addNumber={addNumber} />
      </div>
    </>
  );
}

export default App;
