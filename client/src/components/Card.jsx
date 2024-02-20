import React from "react";

import { download } from "../assets";
import { downloadImage } from "../utils";

import { setClickedDiv } from "../Redux/googleGenerated/formSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Card = ({ _id, name, prompt, dataList }) => {
  const dispatch = useDispatch();
  // console.log("Card", name, prompt, dataList[0].link);
  // const [borderClass, setBorderClass] = useState("");
  const [clickedID, setClickedID] = useState("");

  function handleClick(event) {
    let id = event.target.id;
    dispatch(setClickedDiv(id));
    console.log("this is the id of the div that was clicked");

    // if (event.target.id !== clickedID) {
    // setBorderClass(borderClass === "" ? "border-3 border-blue-500" : "");
    // dispatch(setClickedDiv(id));
    // }

    console.log(event.target.id);
    setClickedID(event.target.id);
    // console.log("this si the length");
    // console.log(dataList[0].length);
  }
  return (
    <div
      key={_id}
      className="rounded-xl group relative shadow-card hover:shadow-cardhover card"
    >
      <img
        id={_id}
        onClick={handleClick}
        className={`w-full h-auto object-cover rounded-xl  ${
          clickedID === _id ? "border-4 border-blue-500" : ""
        }`}
        src={dataList[0].link}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, dataList[0].link)}
            className="outline-none bg-transparent border-none"
          >
            <img
              src={download}
              alt="download"
              className="w-6 h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
