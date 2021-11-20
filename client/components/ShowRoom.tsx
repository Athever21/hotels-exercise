import React from "react";
import { Room } from "@/models/models";
import "@/styles/Room.scss";

interface Props {
  room: Room;
}

const ShowRoom = ({room}: Props) => {
  return (
    <div className="room">
      <div className="room-info">
        <h3>{room.name}</h3>
        <p>Adults: {room.occupancy.maxAdults}</p>
        <p>Children: {room.occupancy.maxChildren}</p>
      </div>
      <div className="room-desc">
        {room.longDescription}
      </div>
    </div>
  )
}

export default ShowRoom;