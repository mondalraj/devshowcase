import React from "react";

function ImageSlider() {
  return (
    <div class="bg-red-500 w-full border-5 relative flex items-center">
      <ul class="flex overflow-x-hidden h-1/2">
        <li className="shrink-1">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            alt="Wild Landscape"
          />
        </li>
        <li className="snap-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            alt="Wild Landscape"
          />
        </li>
        <li className="snap-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            alt="Wild Landscape"
          />
        </li>
        <li className="snap-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            alt="Wild Landscape"
          />
        </li>
        <li className="snap-center">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            alt="Wild Landscape"
          />
        </li>
      </ul>
    </div>
  );
}

export default ImageSlider;
