import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./component/page/HomePage";
import MemoPage from "./component/page/MemoPage";
import SechedulePage from "./component/page/SechedulePage";
import MemoDetail from "./component/memo/MemoDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/schedule" exact={true} element={<SechedulePage />} />
        <Route path="/memo" exact={true} element={<MemoPage />} />
        <Route
          path="/memo/detail/:m_no"
          exact={true}
          element={<MemoDetail />}
        />
      </Routes>
    </>
  );
};

export default App;
