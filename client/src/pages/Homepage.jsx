import React from "react";
import Header from "../components/Homepage/Header";
import Hero from "../components/Homepage/Hero";
import Features from "../components/Homepage/Features";
import Spaces from "../components/Homepage/Spaces";
import Testimonials from "../components/Homepage/Testimonials";
import CallToAction from "../components/Homepage/CallToAction";
import Footer from "../components/Homepage/Footer";

function Homepage() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Features />
        <Spaces />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
