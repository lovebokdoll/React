import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import rootReducer from "./redux/rootReducer";
import { legacy_createStore } from "redux";
import { Provider } from "react-redux";
import ReduxApp from "./ReduxApp";
import AuthLogic from "./service/authLogic";
import firebaseApp from "./service/firebase";
import { setAuth } from "./redux/userAuth/action";
import { BrowserRouter } from "react-router-dom";
//리덕스 적용하기
const store = legacy_createStore(rootReducer);
//AuthLogic객체생성하기
const authLogic = new AuthLogic(firebaseApp);
//store에 있는 초기상채정보 출력하기
store.dispatch(
  setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
console.log(store.getState()); //getState에 있는 정보출력
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <ReduxApp />
      </Provider>
    </BrowserRouter>
  </>
);
