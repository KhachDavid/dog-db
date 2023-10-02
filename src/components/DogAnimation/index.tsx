import React from "react";
import "./style.scss";

const DogAnimation = () => {
  return (
    <>
      <div className="dog-box">
        <div className="ear-right"></div>
        <div className="ear-right-inner"></div>
        <div className="ear-left"></div>
        <div className="ear-left-inner"></div>
        <div className="ear-left-secondary"></div>

        <div className="dog-head">
          <div className="lips">
            <div className="tongue"></div>
          </div>

          <div className="jowl-left">
            <div className="whisker six"></div>
            <div className="whisker seven"></div>
            <div className="whisker eight"></div>
            <div className="whisker nine"></div>
            <div className="whisker ten"></div>
          </div>
          <div className="jowl-right">
            <div className="whisker one"></div>
            <div className="whisker two"></div>
            <div className="whisker three"></div>
            <div className="whisker four"></div>
            <div className="whisker five"></div>
          </div>

          <div className="nose-bridge"></div>
          <div className="nose-top">
            <div className="nose-line"></div>
          </div>
          <div className="nose-tip">
            <div className="nose-hole-left"></div>
            <div className="nose-hole-right"></div>
          </div>

          <div className="eye right"></div>
          <div className="eye left"></div>
          <div className="pupil-left"></div>
          <div className="pupil-right"></div>
          <div className="cornea-right"></div>
          <div className="cornea-left"></div>
          <div className="pupil-light-right"></div>
          <div className="pupil-light-left"></div>
        </div>
      </div>
    </>
  );
};

export default DogAnimation;
