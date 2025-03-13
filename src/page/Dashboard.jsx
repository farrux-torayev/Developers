import React from "react";
import { FaUser } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Navbar />
      <div className="flex flex-col  p-8 ml-[210px]">
        <div className="bg-white  w-[600px] rounded-lg">
          <h2 className="text-[#17a2b8]  text-[50px] font-[700]">Dashboard</h2>
          <div className="flex items-center py-2 ">
            <FaUser className="mr-3 w-6 h-6" />
            <h2 className="text-[26px]  ">Welcome Farrux</h2>
          </div>
          <p className="mt-[10px]">
            You have not yet setup a profile, please add some info
          </p>

          <button
            className="w-[140px] h-[40px] cursor-pointer bg-[#17a2b8] text-white py-2 mt-[15px] hover:bg-[#138a9c] transition"
            onClick={() => navigate("/CreateProfile")}
          >
            Create Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
