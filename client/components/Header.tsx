import React, { useState, useEffect } from "react";
import RoomFilter from "@/components/RoomFilter";
import "@/styles/Header.scss";
import { useHotel } from "@/HotelProvider";

const Header = () => {
  const {setStarFilter, setRoomFilter} = useHotel();

  const [currStar, setCurrStar] = useState(-1);
  const [stars, setStars] = useState([] as Element[]);

  useEffect(() => {
    const starArr: Element[] = [];
    document
      .querySelector(".filter-stars")
      ?.querySelectorAll(".fa-star")
      .forEach((x) => starArr.push(x));
    setStars(starArr);
  }, []);

  const starDisable = (star: Element) => {
    star.classList.remove("star-faded");
    star.classList.remove("fas");
    star.classList.add("far");
  };

  const starEnable = (star: Element) => {
    star.classList.remove("far");
    star.classList.remove("star-faded");
    star.classList.add("fas");
  };

  const starHighlight = (star: Element) => {
    star.classList.remove("far");
    star.classList.add("fas");
    star.classList.add("star-faded");
  }

  const handleHover = (n: number) => {
    for (let i = currStar == -1 ? 0 : currStar; i >= n; i--) {
      stars[i].classList.add("star-faded");
    }
    for (let i = currStar == -1 ? 0 : currStar; i <= n; i++) {
      const star = stars[i];
      if (i <= currStar) star.classList.remove("star-faded");

      if (star.classList.contains("fas")) continue;
      starHighlight(star);
    }
    for (let i = 4; i > n && i > currStar; i--) {
      const star = stars[i];
      starDisable(star);
    }
    for (let i = 0; i < currStar && i <= n; i++) {
      stars[i].classList.remove("star-faded");
    }
  };

  const handleLeave = () => {
    for (let i = 4; i > currStar; i--) {
      const star = stars[i];
      starDisable(star);
    }
    for (let i = 0; i <= currStar; i++) {
      stars[i].classList.remove("star-faded");
    }
  };

  useEffect(() => {
    if (currStar == -1 && stars.length) {
      handleLeave();
    }
  }, [stars, currStar]);

  const handleClick = (n: number) => {
    if (currStar == n) {
      setCurrStar(-1);
      setStarFilter(0);
      return;
    }
    for (let i = 0; i <= n; i++) {
      const star = stars[i];
      starEnable(star);
    }
    for (let i = 4; i > n; i--) {
      const star = stars[i];
      star.classList.remove("fas");
      star.classList.add("far");
    }
    setCurrStar(n);
    setStarFilter(n + 1);
  };

  const renderStars = () => {
    const content: JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
      content.push(
        <div key={i}>
          <i
            onMouseEnter={() => handleHover(i)}
            onClick={() => handleClick(i)}
            className="far fa-star"
          ></i>
        </div>
      );
      // fas - full star | far - empty star
    }
    return content;
  };

  const handleRoomFilter = (adults: boolean, n: number) => {
    setRoomFilter((s: {adults: number, children: number}) => {
      const newFilter = {...s};
      newFilter[adults ? "adults" : "children"] = n;
      return newFilter;
    });
  }

  return (
    <header className="header">
      {/* I didn't know what image supposed to be there so I just left color here */}
      <div className="header-back"></div>
      <div className="header-filters">
        <div className="filter-stars" onMouseLeave={() => handleLeave()}>
          {renderStars()}
        </div>
        <RoomFilter title="Adults" onChange={(n) => handleRoomFilter(true, n)} />
        <RoomFilter title="Children" onChange={(n) => handleRoomFilter(false, n)} />
      </div>
    </header>
  );
};

export default Header;
