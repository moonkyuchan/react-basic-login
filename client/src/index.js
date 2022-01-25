import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import rootRuducers from "./reducers";

const createStoreWidthMiddleware = applyMiddleware(
  reduxPromise,
  reduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider
      store={createStoreWidthMiddleware(
        rootRuducers,
        //개발자도구 리덕스 사용가능
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
