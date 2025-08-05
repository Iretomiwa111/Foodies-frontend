// import { useEffect, useRef } from "react";
// import "./hero.css";
// import { useProtectedAction } from "@/helpers/HandleProtection";
// import { useNavigate } from "react-router-dom";

// const images = [
//   {
//     src: "https://images.unsplash.com/photo-1652282563384-f34a6f15a25b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     title: " A Culinary Journey",
//     topic: "AWAITS",
//     des: "Taste sophistication and elegance in every dish.",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     title: " Your cravings,",
//     topic: " Delivered",
//     des: "Serving bold flavors & handcrafted meals.",
//   },
//   {
//     src: "/grill-8225405.jpg",
//     title: "Effortless dining",
//     topic: "AWAITS",
//     des: "Flame-grilled. Cheese-dripped. Bite into greatness.",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1586040456399-50595fb77ecd?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     title: "Hunger Solved,",
//     topic: "Fast.",
//     des: "Taste That Tells a Story.",
//   },
// ];

// export default function HeroSection() {
//   const carouselRef = useRef(null);
//   const listRef = useRef(null);
//   const thumbnailRef = useRef(null);
//   const timeRef = useRef(null);
//   const nextTimeout = useRef(null);
//   const transitionTimeout = useRef(null);

//    const check = useProtectedAction();
//     const navigate = useNavigate();

//     const handleOrderClick = () => {
//       check(() => navigate("/menu"));
//     };


//   const handleSlide = (type) => {
//     const list = listRef.current;
//     const thumbs = thumbnailRef.current;

//     const items = list.querySelectorAll(".item");
//     const thumbItems = thumbs.querySelectorAll(".item");

//     if (type === "next") {
//       list.appendChild(items[0]);
//       thumbs.appendChild(thumbItems[0]);
//       carouselRef.current.classList.add("next");
//     } else {
//       list.prepend(items[items.length - 1]);
//       thumbs.prepend(thumbItems[thumbItems.length - 1]);
//       carouselRef.current.classList.add("prev");
//     }

//     clearTimeout(transitionTimeout.current);
//     transitionTimeout.current = setTimeout(() => {
//       carouselRef.current.classList.remove("next");
//       carouselRef.current.classList.remove("prev");
//     }, 3000);

//     clearTimeout(nextTimeout.current);
//     nextTimeout.current = setTimeout(() => {
//       handleSlide("next");
//     }, 7000);
//   };

//   useEffect(() => {
//     nextTimeout.current = setTimeout(() => {
//       handleSlide("next");
//     }, 7000);

//     return () => {
//       clearTimeout(nextTimeout.current);
//       clearTimeout(transitionTimeout.current);
//     };
//   }, []);

//   return (
//     <section className="hero">
//       <div className="carousel" ref={carouselRef}>
//         <div className="list" ref={listRef}>
//           {images.map((img, index) => (
//             <div className="item" key={index}>
//               <img src={img.src} alt={img.title} />
//               <div className="content">
//                 {/* <div className="author">{img.author}</div> */}
//                 <div className="title">{img.title}</div>
//                 <div className="topic">{img.topic}</div>
//                 <div className="des text-lg">{img.des}</div>
//                 <div className="buttons">
//                   <button onClick={handleOrderClick}>Order Now</button>
//                 </div>

//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="thumbnail" ref={thumbnailRef}>
//           {images.map((img, index) => (
//             <div className="item" key={index}>
//               <img src={img.src} alt="thumb" />
//               <div className="content">
//                 <div className="title">Try These</div>
//                 <div className="description">Foodies</div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="arrows">
//           <button onClick={() => handleSlide("prev")}>&lt;</button>
//           <button onClick={() => handleSlide("next")}>&gt;</button>
//         </div>

//         <div className="time" ref={timeRef}></div>
//       </div>
//     </section>
//   );
// }

import React from "react";
import { useEffect, useRef, useCallback } from "react";
import "./hero.css";
import { useProtectedAction } from "@/helpers/HandleProtection";
import { useNavigate } from "react-router-dom";

const images = [
  {
    src: "https://images.unsplash.com/photo-1652282563384-f34a6f15a25b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: " A Culinary Journey",
    topic: "AWAITS",
    des: "Taste sophistication and elegance in every dish.",
  },
  {
    src: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: " Your cravings,",
    topic: " Delivered",
    des: "Serving bold flavors & handcrafted meals.",
  },
  {
    src: "/grill-8225405.jpg",
    title: "Effortless dining",
    topic: "AWAITS",
    des: "Flame-grilled. Cheese-dripped. Bite into greatness.",
  },
  {
    src: "https://images.unsplash.com/photo-1586040456399-50595fb77ecd?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hunger Solved,",
    topic: "Fast.",
    des: "Taste That Tells a Story.",
  },
];

export default function HeroSection() {
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRef = useRef(null);
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
              <img src={img.src} alt={img.title} />
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
              <img src={img.src} alt="thumb" />
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

        <div className="time" ref={timeRef}></div>
      </div>
    </section>
  );
}
