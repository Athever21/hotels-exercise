import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import "./style.scss";

const HotelProvider = lazy(() => import("@/HotelProvider"));

render(
  <Suspense fallback={<></>}>
    <Router>
      <HotelProvider>
        <App />
      </HotelProvider>
    </Router>
  </Suspense>,
  document.getElementById("root")
);
