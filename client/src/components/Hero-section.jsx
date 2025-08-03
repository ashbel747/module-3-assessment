import React from "react"
import { Link } from 'react-router-dom';
import HeroImage from "../assets/hero-image.jpg";

export default function Hero() {
  
  return (
    <section
        className="w-screen h-screen scroll-mt-40 overflow-hidden bg-white dark:bg-gray-900"
    >
        <div className="flex items-center justify-center">
            <div className="w-80 h-80">
                <img
                src={HeroImage}
                className="w-full h-full object-cover"
                />
            </div>
        </div>   
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="font-extrabold text-4xl text-center">INKSPIRE BLOGGING PLATFORM</h1>
            <p className="text-xl py-4">A blogging platform where every story finds its space designed <br/> with accessibility at its core, so your voice reaches everyone,<br/> everywhere.</p>
            <Link to="/login" className=" w-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center m-3">LOGIN</Link>
            <Link to="/signup" className="w-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center m-3">SIGNUP</Link>
        </div>
    </section>

  );
}