import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchform } from "../Redux/googleGenerated/formSlice";
import { Card } from "../components";
import { setClickedDiv } from "../Redux/googleGenerated/formSlice";
import { client } from "@gradio/client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Buffer from "buffer";

const Model = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataList, divID, status } = useSelector((state) => {
    // console.log(state);

    return state.form;
  });
  useEffect(() => {
    dispatch(fetchform());
  }, []);

  const RenderCards = ({ data, title }) => {
    if (status === "succeeded") {
      return data.data.map((post) => <Card key={post._id} {...post}></Card>);
    }
    return (
      <h2 className="mt-5 font-bold text-[#64449ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

  const [image, setImage] = useState();
  // const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState();
  const preset_key = "privateShka";
  const cloud_name = "dhpq1wxvf";
  const [file_source, setFile_source] = useState();
  const [file_target, setFile_target] = useState();

  function handleFileChange(e) {
    console.log(e.target.files);
    const file = e.target.files[0];
    setFile_source(file);
    console.log(file_source);

    console.log("this is the file uploaded hasan", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
      )
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.log("cloudinary error " + err));
  }

  function handleTargetImage(e) {
    console.log(e.target.files);
    const file = e.target.files[0];
    setFile_target(file);
  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log("we are inside generate");

    console.log(dataList.data);
    const dataWithRightID = dataList.data.filter((data) => data._id === divID);
    const sourcePhoto = dataWithRightID[0]?.dataList[0].link;
    console.log("1");
    console.log("this is the source photo");
    console.log(sourcePhoto);
    console.log("this is the file u uploaded ", image);

    try {
      const response1 = await fetch(image, {
        headers: { "content-type": "multipart/form-data" },
      });
      const sourceBlob = await response1.blob();
      console.log("finished with blob 1", sourceBlob);

      const response2 = await fetch(sourcePhoto, {
        headers: { "content-type": "multipart/form-data" },
      });
      const targetBlob = await response2.blob();
      console.log("finished with blob 2", targetBlob);

      const List = await fetch(`http://127.0.0.1:5000//upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: file_source,
          target: file_target,
          link_s: image,
          link_t: sourcePhoto,
        }),
      }).then((response) => {
        // Access and use the response data here
        if (response.ok) {
          response = response.json();
          console.log("list finished spinner off");
        } else {
          console.log("There is an error with the response");
        }
        return response;
      });
    } catch (e) {
      alert("An error occurred in the post to flask");
    }

    if (image && divID) {
      console.log("we are inside generating the output file");
      setLoading(true);

      try {
        // const response1 = await fetch(image, {
        //   headers: { "content-type": "multipart/form-data" },
        // });
        // const sourceBlob = await response1.blob();
        // console.log("finished with blob 1", sourceBlob);

        // const response2 = await fetch(sourcePhoto, {
        //   headers: { "content-type": "multipart/form-data" },
        // });
        // const targetBlob = await response2.blob();
        // console.log("finished with blob 2", targetBlob);

        // const result = await handler(blob);
        // const source = await sourcePhoto.blob();
        // const file = await file.blob();
        const app = await client(
          "https://felixrosberg-face-swap.hf.space/--replicas/cjapv/"
        );

        const app_info = await app.view_api();

        console.log(app_info);
        // console.log(file_target);
        // console.log(file_source);

        // const result = await app.predict("/run_inference", [
        //   targetBlob, // blob in 'Target' Image component
        //   sourceBlob, // blob in 'Source' Image component
        //   0, // number (numeric value between 0 and 100) in 'Anonymization ratio (%)' Slider component
        //   0, // number (numeric value between 0 and 100) in 'Adversarial defense ratio (%)' Slider component
        //   // undefined  in 'Mode' Checkboxgroup component
        // ]);
        // // const response = await fetch("http://localhost:8080/api/v1/faceSwap", {
        // //   method: "POST",
        // //   headers: {
        // //     "Content-Type": "application/json",
        // //   },
        // //   body: JSON.stringify({
        // //     target: file,
        // //     source: sourcePhoto,
        // //   }),
        // // });
        console.log("the output image");
        // console.log(result.data);

        // alert("Success");
        navigate("/Gallery");
      } catch (err) {
        console.log("error for uploading ");
        console.log(err);
        // console.log(err.message);
        // alert(err);
      } finally {
        setLoading(false);
        setImage(null);
        dispatch(setClickedDiv(null));
      }
    } else {
      alert(
        "Please Select one of the target photos or upload the source Image"
      );
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328 text-[32px]">
          Select Target
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Select the photo that you have generated from your gallery
        </p>
        <div className="h-[34rem] overflow-y-auto border border-gray-300 p-4">
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            <RenderCards data={dataList} title="No Search results found" />
          </div>
        </div>
        <h1 className="mt-5 font-extrabold text-[#222328 text-[32px]">
          Upload Target Image
        </h1>
        <div>
          <h2>Add your Target Image:</h2>
          <input type="file" onChange={handleTargetImage} />
          {/* <img src={image} /> */}
        </div>
        <h1 className="mt-5 font-extrabold text-[#222328 text-[32px]">
          Select Source
        </h1>
        <div>
          <h2>Add your personal Image:</h2>
          <input type="file" onChange={handleFileChange} />
          <img src={image} />
        </div>
      </div>
      <button
        onClick={handleGenerate}
        className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        {console.log("this is for loading", loading)}
        {loading ? "Generating..." : "Swap the Faces"}
      </button>
    </section>
  );
};

export default Model;
