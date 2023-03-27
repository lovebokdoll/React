import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ReduxApp from "./ReduxApp";
import { Provider } from "react-redux";
import reducer from "./redux/store";
import { legacy_createStore } from "redux";

const store = legacy_createStore(reducer);
console.log(store.getState());
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
