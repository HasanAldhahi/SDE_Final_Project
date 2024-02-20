import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost, Model, LandingPage } from "./pages/index";
import { LoginButton, LogoutButton, Profile } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]">
        <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="w-28 object-contain" />
          </Link>
          <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <span className="mr-5">
              <LoginButton />
            </span>
            <span className="mr-5">
              <LogoutButton />
            </span>

            <span className="mr-5">
              {isAuthenticated ? (
                <Link
                  to="/create-post"
                  className="font-inter font-large bg-[#6469ff] text-white px-4 py-2 rounded-md h-14"
                >
                  Create
                </Link>
              ) : (
                <button
                  onClick={isAuthenticated}
                  className="font-inter font-large bg-[#6469ff] text-white px-4 py-2 rounded-md h-14"
                >
                  Create
                </button>
              )}
            </span>
            <span className="mr-5 pt5">
              {" "}
              <Profile />
            </span>
          </nav>
        </div>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh - 73px)]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {isAuthenticated ? (
            <>
              <Route path="/Create-Post" element={<CreatePost />} />
              <Route path="/Model" element={<Model />}></Route>
              <Route path="/Gallery" element={<Home />}></Route>
            </>
          ) : (
            <></>
          )}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
