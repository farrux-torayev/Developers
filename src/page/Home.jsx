import React from "react";
import Navbar from "../components/Navbar";
import Profile from "./Profile";

const Home = () => {
  return (
    <div>
      <Navbar/>
      <h1>Welcome to Home Page</h1>
      <Profile/>
    </div>
  );
};

export default Home;
