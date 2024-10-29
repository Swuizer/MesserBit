import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import { Toaster } from "react-hot-toast";
import {configureStore} from "@reduxjs/toolkit";
import { thunk } from 'redux-thunk';
import rootReducer from "./reducer";

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster/>
      </BrowserRouter>
  </Provider> 
);
