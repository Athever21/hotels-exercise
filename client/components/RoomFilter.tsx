import React, { useState } from "react";
import "@/styles/RoomFilter.scss";

interface Props {
  title: string;
  onChange: (n: number) => void;
}

const RoomFilter = ({ title, onChange }: Props) => {
  const [value, setValue] = useState(0);

  const inc = () => {
    onChange(value + 1);
    setValue((v) => v + 1);
  };

  const dec = () => {
    if (value != 0) {
      onChange(value - 1);
      setValue((v) => v - 1);
    }
  };

  return (
    <div className="room-filter">
      <p>{title}:</p>
      <div className="room-filter-control" onClick={inc}>
        <i className="fas fa-plus"></i>
      </div>
      <div className="room-filter-counter">{value}</div>
      <div className="room-filter-control" onClick={dec}>
        <i className="fas fa-minus"></i>
      </div>
    </div>
  );
};

export default RoomFilter;
