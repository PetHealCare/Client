import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Carousel from "../../Components/Background/Carousel";
import Body from "../../Components/Body/Body";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  return (
    <div>
      {/*Navbar*/}
      <Navbar />
      {/*Carousel*/}
      <Carousel />
      {/*Body*/}
      <Body />
      {/*Footer*/}
      <Footer />
    </div>
  );
}
