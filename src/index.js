import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import configureStore from "./configureStore";
import { Provider } from "react-redux";

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  //</Provider>
);
