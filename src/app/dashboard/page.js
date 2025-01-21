"use client";

import React from "react";
import AppLayout from "../app-layout"; 
import Navbar from "../../components/Navbar/Navbar";
import Analytics from "../../components/Analytics/Analytics";
import FAQ from "../../components/FAQ/FAQ";
import Earning from "../../components/Earning/Earning";
import Transfer from "../../components/Transfer/Transfer";
import Profile from "../../components/Profile/Profile";
import "./page.css";

const Page = () => {
  return (
    <section className="section-container">
      <Navbar />
      <div className="grid">
        <div className="row__one">
          <Analytics />
          <FAQ />
        </div>
        <div className="row__two">
          <Earning />
          <Transfer />
          <Profile />
        </div>
      </div>
    </section>
  );
};

// Wrap the DashboardPage in AppLayout
Page.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
