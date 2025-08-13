import { Card } from "./ui/(Cards)/focus-cards";
import { useState } from "react";

export default function FocusCardsDemo() {
  const cards = [
     {
      title: "Pizza",
      src: "/focus-pizza1.webp",
    },
    {
      title: "Burger",
      src: "/focus-burger1.webp",
    },
    {
      title: "Sushi",
      src: "/focus-sushi1.webp",
    },
    {
      title: "Pasta",
      src: "/focus-pasta1.webp",
    },
    {
      title: "Salad",
      src: "/focus-salad1.webp",
    },
    {
      title: "Steak",
      src: "/focus-steak1.webp",
    },
    {
      title: "Pancakes",
      src: "./pancake1.webp",
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
