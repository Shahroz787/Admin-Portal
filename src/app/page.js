"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar/Navbar";
import Analytics from "@/components/Analytics/Analytics";
import FAQ from "@/components/FAQ/FAQ";
import Earning from "@/components/Earning/Earning";
import Transfer from "@/components/Transfer/Transfer";
import Profile from "@/components/Profile/Profile";
import "./page.css";

const Page = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to login page if not authenticated
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);



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

export default Page;
