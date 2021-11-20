import React from "react";
import { Hotel } from "@/models/models";
import HotelImages from "@/components/HotelImages";
import ShowRoom from "@/components/ShowRoom";
import "@/styles/SingleHotel.scss";

interface Props {
  hotel: Hotel;
}

const SingleHotel = ({ hotel }: Props) => {
  const displayStars = () => {
    const stars: JSX.Element[] = [];

    const rating = parseInt(hotel.starRating, 10);
    for (let i = 1; i < 6; i++) {
      stars.push(
        <i key={i} className={`${i <= rating ? "fas" : "far"} fa-star`}></i>
      );
    }

    return stars;
  };

  return (
    <div className="single-hotel">
      <div className="hotel-desc">
        <HotelImages id={hotel.id} images={hotel.images} />
        <div className="hotel-info-pos">
          <div className="hotel-info">
            <h3>{hotel.name}</h3>
            <p>{hotel.address1}</p>
            <p>{hotel.address2}</p>
          </div>
          <div className="stars">{displayStars()}</div>
        </div>
      </div>
      <div className="rooms">
        {hotel.rooms.map((x) => (
          <ShowRoom key={x.id} room={x} />
        ))}
      </div>
    </div>
  );
};

export default SingleHotel;
