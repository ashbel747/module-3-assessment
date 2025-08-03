import React from "react"
import { Link } from 'react-router-dom';
import HeroImage from "../assets/hero-image.jpg";

export default function Hero() {
  
  return (
    <section
        className="w-screen h-screen scroll-mt-40 overflow-hidden"
    >
        <div className="flex items-center justify-center">
            <div className="w-80 h-80">
                <img
                src={HeroImage}
                className="w-full h-full object-cover"
                />
            </div>
        </div>   
    <h1 className="font-extrabold text-4xl text-center">INKSPIRE BLOGGING PLATFORM</h1>
    <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center mt-16">LOGIN</Link>
    </section>

  );
}