import React from "react";
import { BiGroup } from "react-icons/bi";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import "./Analytics.css";

const Analytics = () => {
  return (
    <div className="section">
      <div className="analytic">
        <div className="content">
          <h5>Average Revenue</h5>
          <h2>$25,565</h2>
        </div>
        <div className="logo">
          <BsFillCalendar2WeekFill />
        </div>
      </div>

      <div className="analytic">
        <div className="content">
          <h5>Customer Return</h5>
          <h2>876</h2>
        </div>
        <div className="logoo">
          <BiGroup />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
