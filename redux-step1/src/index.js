import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReduxApp from "./ReduxApp";
import { Provider } from "react-redux";
import reducer from "./redux/store";
import { legacy_createStore } from "redux";
//store생성
const store = legacy_createStore(reducer); //worker(state,action)
console.log(store.getState()); //getState() store.js에 있는 정보가 출력됨
console.log(store.getState().depts);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/*<App />*/}
    <Provider store={store}>
      <ReduxApp />
    </Provider>
  </>
);
