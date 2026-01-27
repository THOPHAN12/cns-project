import { useState } from "react";
import localVideo from "../assets/AR try on.mp4";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function VideoPopUp({isOpenPopUp, setIsOpenPopUp}) {
    return (<div className={"fixed bottom-0 right-0 w-100 h-140 z-50 bg-white rounded-2xl " + (!isOpenPopUp && "hidden") }>
        <button onClick={() => setIsOpenPopUp(!isOpenPopUp)}><IoIosCloseCircleOutline className="size-8"/></button>
        <div className="w-full max-w-3xl">
        <video 
          className="w-full h-auto rounded-xl shadow-2xl border-4 border-white"
          controls 
          autoPlay 
          muted 
          loop
        >
          <source src={localVideo} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>
    </div>)
}