import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Tilt from "react-tilt";

import Card from "./Card";

function CustomCarousel({ label, data, auto, infinite }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      //   slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      //   slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      //   slidesToSlide: 1,
    },
  };

  return (
    <>
      <h1 className="text-3xl sm:text-4xl pl-12 mt-4 font-medium text-gray-100">
        {label}
      </h1>
      <Carousel
        draggable={false}
        infinite={infinite}
        autoPlay={auto || true}
        autoPlaySpeed={2000}
        responsive={responsive}
      >
        {data.map((el, index) => {
          return (
            <Tilt
              className="Tilt"
              options={{ max: 25 }}
              style={{ margin: "5em 0" }}
            >
              <Card image={el.image} title={el.name} subTitle={el.occ} />
            </Tilt>
          );
        })}
      </Carousel>
    </>
  );
}

export default CustomCarousel;
