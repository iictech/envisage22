import React from "react";

function Card({ image, title, subTitle, link }) {
  return (
    <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white mx-auto">
      <img class="w-full object-contain" src={image} alt="..." />
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{title}</div>
        <p class="text-gray-700 text-base">{subTitle}</p>
      </div>
      <center>
      {link ? <a href={link} class="font-bold p-3 text-xl rounded-md">
           Register Now
      </a>:''}
      </center>
      <br />
    </div>
  );
}

export default Card;
