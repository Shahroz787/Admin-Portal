import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import "./Earning.css";

const data = [
  { data: 4500 }, { data: 5000 }, { data: 4700 }, { data: 4400 }, { data: 4800 },
  { data: 5300 }, { data: 5800 }, { data: 6000 }, { data: 6300 }, { data: 6580 },
  { data: 6780 }, { data: 6680 }, { data: 6500 }, { data: 6300 }, { data: 5900 },
  { data: 5700 }, { data: 5500 }, { data: 5300 }, { data: 5100 }, { data: 5090 },
  { data: 5300 }, { data: 5800 }, { data: 6000 }, { data: 6300 }, { data: 6780 },
  { data: 6500 }, { data: 6300 }, { data: 6500 }, { data: 6700 }, { data: 7000 },
  { data: 7300 }, { data: 7500 }, { data: 7700 }, { data: 8090 }, { data: 8190 },
  { data: 7990 }, { data: 7700 }, { data: 7500 }, { data: 7300 }, { data: 7000 },
  { data: 6700 }, { data: 6500 }, { data: 6300 }, { data: 6500 }, { data: 6780 },
  { data: 6300 }, { data: 6000 }, { data: 5800 }, { data: 5490 }, { data: 6000 },
  { data: 8000 },
];


const Earning = () => {
  return (
    <div className="earning-section">
      <div className="top">
        <div className="info">
          <h5>Earnings of this month</h5>
          <h1>$889.7</h1>
          <div className="growth">
            <span>3.67%</span>
          </div>
        </div>
      </div>
      <div className="chart-container">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data}>
            <Tooltip cursor={false} />
            <Area
              type="monotone"
              dataKey="data"
              stroke="#00ddff"
              fill="#8068233e"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Earning;
