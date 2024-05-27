import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

function App() {
  
  return (
    <>
    <Navbar/>
    <Hero/>
    <Footer/>
    </>
  );
}

export default App;
