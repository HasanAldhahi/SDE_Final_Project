import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchform } from "../Redux/googleGenerated/formSlice";
import { Card } from "../components";
import { setClickedDiv } from "../Redux/googleGenerated/formSlice";

const Model = () => {
  const dispatch = useDispatch();
  const { dataList, divID, status } = useSelector((state) => {
    // console.log(state);
    console.log("this is from the redux");
    console.log(state.form.dataList.data);

    return state.form;
  });

  useEffect(() => {
    dispatch(fetchform());
  }, []);

  const RenderCards = ({ data, title }) => {
    console.log("this is allPosts ", status);
    // console.log("this is the data array", data.data[0]);

    if (status === "succeeded") {
      return data.data.map((post) => <Card key={post._id} {...post}></Card>);
    }
    return (
      <h2 className="mt-5 font-bold text-[#64449ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

  const [file, setFile] = useState();
  const [loading, setLoading] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log("we are inside generate");
    console.log(dataList.data);
    const dataWithRightID = dataList.data.filter((data) => data._id === divID);
    const sourcePhoto = dataWithRightID[0].dataList[0].link;
    console.log("1");
    console.log("this is the source photo");
    console.log(sourcePhoto);
    console.log("this is the file u uploaded ", file);

    if (file && divID) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Target: file,
            source: divID,
            dataList: form.dataList,
          }),
        });
        console.log(response.json());
        // await response.json();
        alert("Success");
        navigate("/Home");
      } catch (err) {
        alert("error ", err);
      } finally {
        setLoading(false);
        setFile(null);
        dispatch(setClickedDiv(null));
      }
    } else {
      alert("Please enter a prompt to generate an image");
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
          Select Source
        </h1>
        <div>
          <h2>Add your personal Image:</h2>
          <input type="file" onChange={handleChange} />
          <img src={file} />
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
