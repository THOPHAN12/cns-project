import React from "react";
import Footer from "../../Footer";
import Navbar from "../../Navbar";
import { useState } from "react";

import c1 from "../../../assets/ai-ar/clothes_models/c1.png"
import c2 from "../../../assets/ai-ar/clothes_models/c2.png"
import c3 from "../../../assets/ai-ar/clothes_models/c3.png"
import c4 from "../../../assets/ai-ar/clothes_models/c4.png"
import c5 from "../../../assets/ai-ar/clothes_models/c5.png"
import c6 from "../../../assets/ai-ar/clothes_models/c6.png"
import c7 from "../../../assets/ai-ar/clothes_models/c7.png"
import c8 from "../../../assets/ai-ar/clothes_models/c8.png"

import fr1 from "../../../assets/ai-ar/result/female/2.6.png"
import fr2 from "../../../assets/ai-ar/result/female/2.1.png"
import fr3 from "../../../assets/ai-ar/result/female/mẫu nữ áo 1mới.png"
import fr4 from "../../../assets/ai-ar/result/female/2.3.png"

import fr5 from "../../../assets/ai-ar/result/female/1.5.png"
import fr6 from "../../../assets/ai-ar/result/female/1.3.png"
import fr7 from "../../../assets/ai-ar/result/female/1.4.png"
import fr8 from "../../../assets/ai-ar/result/female/r5.png"

const set = [
  { id: 1, clothesImg: c1, resultImg: fr1 },
  { id: 2, clothesImg: c2, resultImg: fr2 },
  { id: 3, clothesImg: c3, resultImg: fr3 },
  { id: 4, clothesImg: c4, resultImg: fr4 },
  { id: 5, clothesImg: c5, resultImg: fr5 },
  { id: 6, clothesImg: c6, resultImg: fr6 },
  { id: 7, clothesImg: c7, resultImg: fr7 },
  { id: 8, clothesImg: c8, resultImg: fr8 },
];

export default function ARTryOnPage() {
  // State to track which result image is displayed on the left
  // Defaults to the first item in the set
  const [activeImage, setActiveImage] = useState(set[0].resultImg);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div id="ar-body" className="flex-grow mt-12 flex flex-col items-center pt-10 pb-20 px-4">
        
        {/* Title Section */}
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-black">
            THỬ ĐỒ ẢO
          </h1>
          <p className="text-gray-500 font-light text-sm md:text-base">
            Trải nghiệm form dáng sản phẩm bằng công nghệ AR
          </p>
        </div>

        {/* Main Content: 2-Column Layout */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Model View (Dynamic) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col">
            <div className="bg-gray-100 py-3 text-center">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                AR Try-On
              </span>
            </div>
            
            <div className="bg-gray-50 relative w-full overflow-hidden">
              <img 
                src={activeImage} 
                alt="AR Model Result" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Clothing Grid (Mapped from single array) */}
          <div className="md:col-span-8 lg:col-span-8 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {set.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveImage(item.resultImg)}
                  className={`aspect-[3/4] bg-white p-2 cursor-pointer hover:opacity-90 transition-opacity border-2 ${activeImage === item.resultImg ? 'border-black' : 'border-transparent'}`}
                >
                  <img 
                    src={item.clothesImg} 
                    alt={`Product ${item.id}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}