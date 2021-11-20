import React from "react";
import Slider from "@/components/Slider";

interface Props {
  id: string;
  images: {url: string}[];
}

const HotelImages = ({id, images}: Props) => {
  return (
    <div className="hotel-images">
      {images.length > 1 ? <Slider id={id} images={images} /> : <img src={images[0].url} />}
    </div>
  );
};

export default HotelImages;
