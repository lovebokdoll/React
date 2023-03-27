import React from "react";
import ReduxFooter from "./component/include/ReduxFooter";
import ReduxHeader from "./component/include/ReduxHeader";
import ReduxMainPage from "./component/page/ReduxMainPage";

const ReduxApp = () => {
  return (
    <>
      <h3>리덕스적용예제</h3>
      <ReduxHeader />
      <ReduxMainPage />
      <ReduxFooter />
    </>
  );
};

export default ReduxApp;
