import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

import { FormField, Loader } from "../components";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);

  const handleChange = (e) => {};
  const handleSubmit = () => {};
  const handleSupriseMe = () => {};

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328 text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">
          Create Imaginative visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className=" mt-16 max-w-3xl " onSubmit={{ handleSubmit }}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="Prompt"
            placeholder=" a bowl of soup that looks like a monster, knitted out of wool"
            value={form.name}
            handleSupriseMe={handleSupriseMe}
            isSupriseMe
            handleChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
}

export default CreatePost;