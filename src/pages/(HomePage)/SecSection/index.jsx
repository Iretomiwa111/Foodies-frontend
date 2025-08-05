import React, { useContext } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/pages/context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sec.css";

const images = [
  "/burger.avif",
  "/milkshake.jpg",
  "/pancake.jpg",
  "/rice.jpg",
  "./steaak.jpg",
];

const NextArrow = ({ className, onClick }) => (
  <div className={`${className} custom-arrow right`} onClick={onClick}>
    <FaChevronRight />
  </div>
);

const PrevArrow = ({ className, onClick }) => (
  <div className={`${className} custom-arrow left`} onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const ImageSlider = () => {
  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

 const handleProtectedClick = (e, path) => {
  if (!user) {
    e.preventDefault();
    toast.warning("Please login or sign up first");
    setTimeout(() => navigate(`/auth?next=${path}`), 1200);
  }
};


  return (
    <>
      <h1 className="text-center font">Top Picks</h1>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div className="slide-container" key={index}>
              <img src={`${src}?w=600&auto=format`} alt={`img-${index}`} />
            </div>
          ))}
        </Slider>
      </div>
      <div className="browse-cta">
        <Link
          to="/menu"
          className="browse-btn"
          onClick={(e) => handleProtectedClick(e, "/menu")}
        >
          Browse Full Menu →
        </Link>
      </div>
    </>
  );
};

export default ImageSlider;
