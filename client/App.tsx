import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";

const Header = lazy(() => import("@/components/Header"));
const HotelList = lazy(() => import("@/components/HotelList"));

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Header />
      <HotelList />
    </Suspense>
  );
};

export default hot(module)(App);
