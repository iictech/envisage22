import React from "react";
import "../teamCard.css";
import TeamData from "./TeamData";
import { AiFillLinkedin } from "react-icons/ai";
import Header from "../../Header"
import Footer from "../../Footer"
const TeamCard = () => {
  return (
    <>
      {" "}
      <Header/>
      <div className="container">
        {TeamData.map((curr, index) => {
          const { id, name, profession, img } = curr;
          return (
            <>
              <div className="card" key={id}>
                <div className="pic-container">
                  <img
                    className="pic"
                    src={img}
                    alt="Profile Picture"
                  />
                </div>
                <div className="name">
                  <span>{name}</span>
                </div>
                <div className="titledescr">
                  <span>{profession}</span>
                </div>
                <div className="titleLink">
                  <a >
                    <AiFillLinkedin />
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <Footer/>
    </>
  );
};

export default TeamCard;
