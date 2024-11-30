
"use client";

import { Carousel } from "flowbite-react";

export function CarrouselFlowBite() {
  return (
    <div className="h-max w-full flex justify-center pt-10 relative mb-10">
      <Carousel className="h-[70vh] w-[70vw]">
        <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
        <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
      </Carousel>
    </div>
  );
}
