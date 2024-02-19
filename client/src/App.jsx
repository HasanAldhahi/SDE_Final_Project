import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost , Model, LandingPage} from "./pages/index";
import {LoginButton, LogoutButton, Profile} from "./components"


function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        {/* <LoginButton />
        <LogoutButton />
        <Profile /> */}
        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]">
        <Routes>
          <Route path="/"  element={<LandingPage />} />
          <Route path="/Create-Post" element={<CreatePost />} />
          <Route path="/Model" element={<Model/>} ></Route>
          <Route path = "/Gallery" element={<Home />} ></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
