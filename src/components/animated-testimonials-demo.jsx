import { AnimatedTestimonials } from "./ui/(Testimonial)/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "This place is heaven for food lovers! The pizza melted in my mouth, and the flavors were unforgettable. I've found my go-to restaurant.",
      name: "Sarah Chen",
      designation: "Food Blogger at Bites & Brews",
      src: "/test3a.webp",
    },
    {
      quote:
        "Ordering from here was a breeze, and the food arrived hot and fresh. The grilled chicken wrap was bursting with flavor. Highly recommended!",
      name: "Michael Rodriguez",
      designation: "Chef & Culinary Critic",
      src: "/test4a.webp",
    },
    {
      quote:
        "Hands down the best burgers in town! Juicy, well-seasoned, and paired with crispy fries that tasted homemade. I'll be coming back for sure.",
      name: "Emily Watson",
      designation: "Founder at Crave Chronicles",
      src: "/test1a.webp",
    },
    {
      quote:
        "From presentation to taste, everything was flawless. The desserts were especially divine — the molten lava cake was pure perfection.",
      name: "James Kim",
      designation: "Dessert Enthusiast",
      src: "/test5a.webp",
    },
    {
      quote:
        "Our team lunch was a hit thanks to your catering! The variety, freshness, and flavor were unmatched. Keep up the delicious work!",
      name: "Lisa Thompson",
      designation: "Event Planner at Taste & Table Co.",
      src: "/test2a.webp",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
