import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Link } from "react-router-dom";

import { FormField, Loader } from "../components";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
    dateList: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeName = (e) => {
    console.log("this is the changed valeu ", e.target.value);
    setForm({ ...form, name: e.target.value });
  };

  const handleChange = (e) => {
    console.log("this is the changed valeu ", e.target.value);
    setForm({ ...form, prompt: e.target.value });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        console.log("this is the data we need to change");
        console.log(data);
        setForm({ ...form, dataList: data.list });
      } catch (error) {
        alert("No results has been found! Try simpler Prompt");
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter Prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.dataList) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            prompt: form.prompt,
            dataList: form.dataList,
          }),
        });
        console.log(response.json());
        // await response.json();
        alert("Success");
        navigate("/Model");
      } catch (err) {
        alert("error ", err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt to generate an image");
    }
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    console.log("button was clicked");
    console.log(randomPrompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328 text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create Imaginative visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className=" mt-16 max-w-3xl " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChangeName}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="Prompt"
            placeholder=" a bowl of soup that looks like a monster, knitted out of wool"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {console.log(
              "ths si the photo that u were wanting it ",
              form.dataList?.link
            )}
            {form.dataList ? (
              <img
                src={form.dataList.link}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          {/* <Link to= "/Model"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Swap the Face with the generated image
            </Link> */}
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Uploading..." : "Upload the image to DataBase"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
