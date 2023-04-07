import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import firebaseApp from "./service/firebase";
import AuthLogic from "./service/authLogic";
import rootReducer from "./redux/rootReducer";
import { legacy_createStore } from "redux";
import { setAuth } from "./redux/userAuth/action";
//Action의 타입을 주는 코드
const authLogic = new AuthLogic(firebaseApp);
const store = legacy_createStore(rootReducer);
store.dispatch(
  setAuth(authLogic.getUserAuth(), authLogic.getGoogleAuthProvider())
);
console.log(store.getState())//store의 상태 찍어봄
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
);
