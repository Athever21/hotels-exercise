import React, { lazy, Suspense } from "react";
import Loading from "@/components/Loading";
import { useHotel } from "@/HotelProvider";
import "@/styles/HotelList.scss";

const SingleHotel = lazy(() => import("@/components/SingleHotel"));

const HotelList = () => {
  const { hotels, loading } = useHotel();

  if (loading) return <div className="load-hotels"><Loading /></div>;

  return (
    <main className="hotel-list">
      <Suspense fallback={<></>}>
        {hotels.length ? (
          hotels.map((x) => <SingleHotel key={x.id} hotel={x} />)
        ) : (
          <div className="not-found">No hotels fulfilling requirments</div>
        )}
      </Suspense>
    </main>
  );
};

export default HotelList;
