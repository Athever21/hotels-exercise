import React, { useState, useEffect } from "react";
import "@/styles/Slider.scss";

interface Props {
  id: string;
  images: { url: string }[];
}

const Slider = ({ id, images }: Props) => {
  const [curr, setCurr] = useState(0);
  const [imgs, setImgs] = useState([] as HTMLImageElement[]);

  useEffect(() => {
    const imgArr: HTMLImageElement[] = [];

    document
      .getElementById(`slider-${id}`)
      ?.querySelectorAll("img")
      .forEach((x, i) => {
        imgArr.push(x);
        if (i != 0) x.style.marginLeft = "-100%";
      });

    setImgs(imgArr);
  }, []);

  const slide = (
    currImage: HTMLImageElement,
    nextImage: HTMLImageElement,
    left: boolean
  ) => {
    nextImage.style.transition = "none";
    nextImage.style.marginLeft = left ? "100%" : "-100%";

    setTimeout(() => {
      nextImage.style.transition = "margin 0.5s ease-in-out";
      currImage.style.transition = "margin 0.5s ease-in-out";
      currImage.style.marginLeft = left ? "-100%" : "100%";
      nextImage.style.marginLeft = "0";
    }, 0);
  };

  const slideLeft = () => {
    const next = curr == 0 ? imgs.length - 1 : curr - 1;
    slide(imgs[curr], imgs[next], true);
    setCurr(next);
  };

  const slideRight = () => {
    const next = curr == imgs.length - 1 ? 0 : curr + 1;
    slide(imgs[curr], imgs[next], false);
    setCurr(next);
  };

  return (
    <div className="slider" id={`slider-${id}`}>
      <i onClick={slideLeft} className="fas fa-chevron-left"></i>
      <i onClick={slideRight} className="fas fa-chevron-right"></i>
      {images.map((x) => (
        <img key={x.url} src={x.url} />
      ))}
    </div>
  );
};

export default Slider;
