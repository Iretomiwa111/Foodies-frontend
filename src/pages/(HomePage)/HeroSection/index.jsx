import React, { useEffect, useRef, useCallback } from "react";
import "./hero.css";
import { useProtectedAction } from "@/helpers/HandleProtection";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "/hero1a.webp",
    title: "A Culinary Journey",
    topic: "AWAITS",
    des: "Taste sophistication and elegance in every dish.",
  },
  {
    src: "/hero3a.webp",
    title: "Your cravings,",
    topic: "Delivered",
    des: "Serving bold flavors & handcrafted meals.",
  },
  {
    src: "/grill1.webp",
    title: "Effortless dining",
    topic: "AWAITS",
    des: "Flame-grilled. Cheese-dripped. Bite into greatness.",
  },
  {
    src: "/hero4a.webp",
    title: "Hunger Solved,",
    topic: "Fast.",
    des: "Taste That Tells a Story.",
  },
];

export default function HeroSection() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const nextTimeout = useRef(null);
  const transitionTimeout = useRef(null);

  const check = useProtectedAction();
  const navigate = useNavigate();

  const handleOrderClick = () => {
    check(() => navigate("/menu"));
  };

  const handleSlide = useCallback((type) => {
    const list = listRef.current;
    const thumbs = thumbnailRef.current;

    const items = list.querySelectorAll(".item");
    const thumbItems = thumbs.querySelectorAll(".item");

    if (type === "next") {
      list.appendChild(items[0]);
      thumbs.appendChild(thumbItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      list.prepend(items[items.length - 1]);
      thumbs.prepend(thumbItems[thumbItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, 3000);

    clearTimeout(nextTimeout.current);
    nextTimeout.current = setTimeout(() => {
      handleSlide("next");
    }, 7000);
  }, []);

  useEffect(() => {
    nextTimeout.current = setTimeout(() => {
      handleSlide("next");
    }, 7000);

    return () => {
      clearTimeout(nextTimeout.current);
      clearTimeout(transitionTimeout.current);
    };
  }, [handleSlide]);

  return (
    <section className="hero">
      <div className="carousel" ref={carouselRef}>
        <div className="list" ref={listRef}>
          {images.map((img, index) => (
            <div className="item" key={index}>
              <img
                src={img.src}
                alt={img.title}
                width="1920"
                height="1080"
                loading={index === 0 ? "eager" : "lazy"}
                importance={index === 0 ? "high" : "auto"}
                decoding="async"
                style={{ objectFit: "cover", display: "block" }}
              />
              <div className="content">
                <div className="title">{img.title}</div>
                <div className="topic">{img.topic}</div>
                <div className="des text-lg">{img.des}</div>
                <div className="buttons">
                  <button onClick={handleOrderClick}>Order Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail" ref={thumbnailRef}>
          {images.map((img, index) => (
            <div className="item" key={index}>
              <img
                src={img.src}
                alt="thumb"
                width="150"
                height="100"
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
              <div className="content">
                <div className="title">Try These</div>
                <div className="description">Foodies</div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button onClick={() => handleSlide("prev")}>&lt;</button>
          <button onClick={() => handleSlide("next")}>&gt;</button>
        </div>

        <div className="time"></div>
      </div>
    </section>
  );
}
