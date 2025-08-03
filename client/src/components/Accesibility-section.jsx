import React from "react"
import { Link } from 'react-router-dom';
import AccessImage from "../assets/Inclusive by.jpg";

export default function Accessibility() {
  
  return (
    <section
        className="w-screen overflow-hidden"
    >
        <div className="flex items-center justify-center">
            <div className="w-screen">
                <img
                src={AccessImage}
                className="w-full h-96 object-cover"
                />
            </div>
        </div>   
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-4">
            <div>
                <p className="text-gray-900 dark:text-white text-xl text-left py-6"> 
                    Designing with accessibility in mind is more than a moral<br/> imperative; it's a strategic advantage. When we build digital<br/> experiences that accommodate diverse needs, we unlock<br/> usability for everyone, not just those with permanent<br/> disabilities. Consider users navigating with screen readers,<br/> individuals with low vision, or someone using a mobile<br/> device in bright sunlight. Accessibility features like proper<br/> heading hierarchy, alt text, and sufficient color contrast<br/> benefit all these users. Inclusive design isn't a niche<br/> concern; it's foundational to good UX.
                </p>
                <p className="text-gray-900 dark:text-white text-xl text-left">
                    Ultimately, accessible design is  human centered design. It<br/> challenges us to think beyond edge cases and embrace the full<br/> spectrum of user needs. By designing for inclusion, we create<br/> products that are more resilient, adaptable, and future proof.<br/> Accessibility isn't just about doing<br/> the right thing; it's about doing things right. And when we get<br/> it right, we build digital spaces where everyone belongs.
                </p>
            </div>
            <div className="border-blue-600 w-full  border-2 mt-5 mr-16">
                <p className="mb-6 ml-2">Publication Date<br/><span className="text-blue-400">4/7/2025</span></p>
                <p className="mb-6 ml-2">Category<br/><span className="text-blue-400">Design</span></p>
                <p className="mb-6 ml-2">Reading time<br/><span className="text-blue-400">2 Hours</span></p>
                <p className="mb-6 ml-2">Author Name<br/><span className="text-blue-400">Lily Njagi</span></p>
                <p className="m-2 text-gray-700 font-semibold">Table of Contents</p>
                <div className="bg-blue-700 w-96 h-60 ml-2 rounded-md mb-6">
                    <ul className="list-disc ml-7">
                        <li>Introduction</li>
                        <li>AI in Diagnostic Imaging</li>
                        <li>Predictive Analytics and Disease Prevention</li>
                        <li>Personalized treatment plans</li>
                        <li>Drug Discovery</li>
                        <li>AI in Telemedicine</li>
                        <li>Ethical Considerations</li>
                        <li>The future of AI in Healthcare</li>
                        <li>Conclusion</li>
                    </ul>
                </div>
            </div>  
        </div>
    </section>

  );
}