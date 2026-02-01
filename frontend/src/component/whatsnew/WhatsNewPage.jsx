import Navbar from "../Navbar";
import image1 from "../../assets/image-whats-new-1.png"
import image2 from "../../assets/image-whats-new-2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import React from 'react';
import computerImage from "../../assets/anaresult.jpg"
import anaResult from "../../assets/computer-whats-new.png"
import sweatshirt1 from "../../assets/sweatshirt-full.png"
import sweatshirt2 from "../../assets/sweatshirt2.png"
import Footer from "../Footer";

const ListItem = ({ text }) => (
  <li className="flex items-center space-x-2 text-gray-700 font-medium">
    <span className="w-1.5 h-1.5 bg-[#5e4b43] rounded-full shrink-0"></span>
    <span>{text}</span>
  </li>
);

const ActionButton = ({ text }) => (
  <button className="mt-6 px-6 py-2.5 bg-[#A88B7D] hover:bg-[#967a6d] text-white font-medium rounded transition-colors duration-200">
    {text}
  </button>
);

export default function WhatsNewPage() {
    return (
        <div className="">
            <Navbar />
            
            <Footer />
        </div>
    )
}