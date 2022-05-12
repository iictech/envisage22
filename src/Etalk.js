import React from "react";
import CustomCarousel from "./components/CustomCarousel";
import Footer from "./Footer";
import Example from "./Header";
import etalk from "../src/images/e-talk/etalk-pic.svg";
import previousYearGuest from "./stub/etalk/previousYearGuest";
import presentYearGuest from "./stub/etalk/presentYearGuest";

function Etalk() {
  return (
    <div>
      <Example />
      <div className="mb-32 sm:mb-16" style={{ height: "100vh" }}>
        <h1 className="text-center text-3xl sm:text-4xl  mt-4 font-medium text-gray-100">
          E-Talk
        </h1>
        <img
          className="w-64  sm:w-full h-64 object-contain mx-auto my-4 sm:my-16"
          alt="etalk"
          src={etalk}
        />
        <p className="text-gray-100 max-w-xs sm:max-w-3xl mx-auto sm:my-8 sm:text-xl text-center leading-8">
          Nothing can inspire young minds more than role models and sharing
          their experience gives them the pursuit of happiness and wish to once
          be there on stage. With our E-Talks held by eminent personalities who
          have proved themselves in the field of innovation and
          entrepreneurship, participants get to know about their thrilling and
          adventurous journey first hand.
        </p>
      </div>
      <CustomCarousel
        auto={false}
        infinite={true}
        label={"Present Year Guest:"}
        data={presentYearGuest}
      />
      <CustomCarousel
        auto={true}
        infinite={true}
        label={" Previous Year Guest:"}
        data={previousYearGuest}
      />

      <Footer />
    </div>
  );
}

export default Etalk;
