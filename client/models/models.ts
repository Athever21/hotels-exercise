export interface Hotel {
  id: string;
  name: string;
  address1: string;
  address2: string;
  starRating: string;
  images: Image[];
  rooms: Room[];
}

interface Image {
  url: string;
}

interface RoomFilter {
  adults: number;
  children: number;
}

export interface HotelContext {
  hotels: Hotel[];
  loading: boolean;
  starFilter: number;
  setStarFilter: (n: number) => void;
  roomFilter: RoomFilter;
  setRoomFilter: Function;
}

interface Occupancy {
  maxAdults: number;
  maxChildren: number;
}

export interface Room {
  id: string;
  name: string;
  occupancy: Occupancy;
  longDescription: string;
}