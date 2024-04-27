import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import "./scss/styles.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter as Router } from "react-router-dom";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

import global_en from "./transtations/en/global.json";
import global_tw from "./transtations/tw/global.json";
import global_vn from "./transtations/vn/global.json";

const languages = localStorage.getItem("languages");

i18next.init({
  interpolation: { escapeValue: false },
  lng: languages === null ? "TW" : languages,
  resources: {
    TW: {
      global: global_tw,
    },
    EN: {
      global: global_en,
    },
    VN: {
      global: global_vn,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Router>
);

reportWebVitals();
