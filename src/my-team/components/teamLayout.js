import React from "react";
import TeamCard from "./TeamCardCompoent";
import "../teamStyle.css";
const TeamLay = () => {
  return (
    <>
      <div className="page-wrapper">
        <div className="row">
          <TeamCard />
        </div>
      </div>
    </>
  );
};

export default TeamLay;
