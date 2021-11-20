import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Hotel, HotelContext } from "./models/models";

const HotelContext = React.createContext({} as HotelContext);

export const useHotel = () => useContext(HotelContext);

const HotelProvider = ({ children }: { children: React.ReactNode }) => {
  const [allHotels, setAllHotels] = useState([] as Hotel[]);
  const [hotels, setHotels] = useState([] as Hotel[]);
  const [loading, setLoading] = useState(true);
  const [starFilter, setStarFilter] = useState(0);
  const [roomFilter, setRoomFilter] = useState({ adults: 0, children: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        "https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG"
      );
      for (const hotel of data) {
        const { data } = await axios.get(
          `https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${hotel.id}`
        );
        hotel.rooms = data.rooms;
      }
      setAllHotels(data);
    })();
  }, []);

  useEffect(() => {
    if (allHotels.length) {
      const arr: Hotel[] = [];
      for (const hotel of allHotels) {
        if (parseInt(hotel.starRating, 10) < starFilter) continue;
        const rooms = hotel.rooms.filter(
          (x) =>
            x.occupancy.maxAdults >= roomFilter.adults &&
            x.occupancy.maxChildren >= roomFilter.children
        );
        if (rooms.length) arr.push({ ...hotel, rooms });
      }

      setHotels(arr);
      setLoading(false);
    }
  }, [allHotels, roomFilter, starFilter]);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        loading,
        starFilter,
        setStarFilter,
        roomFilter,
        setRoomFilter,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;
