import { Card } from "./ui/(Cards)/focus-cards";
import { useState } from "react";

export default function FocusCardsDemo() {
  const cards = [
     {
      title: "Pizza",
      src: "https://images.unsplash.com/photo-1613564834361-9436948817d1?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Burger",
      src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    },
    {
      title: "Sushi",
      src: "https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Pasta",
      src: "https://plus.unsplash.com/premium_photo-1677000666741-17c3c57139a2?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Salad",
      src: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Steak",
      src: "https://images.unsplash.com/photo-1432139509613-5c4255815697?w=500&auto=format&fit=crop&q=60",
    },
    {
      title: "Pancakes",
      src: "./pancake.jpg",
    },
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <section className="py-16 px-4 bg-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-white mb-10 font-lobster text-white">
        Recommended Dishes
      </h1>

      <div className="overflow-x-auto">
        <div className="flex gap-4 sm:gap-6 w-max">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="min-w-[220px] sm:min-w-[250px] max-w-[80vw] sm:max-w-[250px] flex-shrink-0 font-lobster"
            >
              <Card
                card={card}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
