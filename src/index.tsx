import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseAppProvider } from "reactfire";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "@revolut/ui-kit";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBT_oAI26dMGlPWGstKV85yTd__xL7kbm4",
  authDomain: "secret-santa-cae60.firebaseapp.com",
  databaseURL:
    "https://secret-santa-cae60-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "secret-santa-cae60",
  storageBucket: "secret-santa-cae60.appspot.com",
  messagingSenderId: "1043755730302",
  appId: "1:1043755730302:web:8232abb1993742f91e9f2f",
  measurementId: "G-1MRMNEWJ8Q",
};

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={DefaultTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
