import React from "react";
import { RiCodeSSlashLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className="bg-[#343a40]">
    <div className="bg-[#343a40] w-[1440px] m-auto flex items-center justify-between  h-[70px]">
        <div className="flex ">
          <p className="flex items-center  text-white">
            <RiCodeSSlashLine  className="w-[25px] h-[25px]  font-bold"/>
            <span className="text-[25px] ml-[5px] font-[700]">DevConnector</span>
          </p>
        </div>
        <ul className="flex gap-[10px]">
          <li>
            <NavLink to={"/developers"} className="text-white p-[8px] text-[18px] hover:text-[#17a2b8]">Developers</NavLink>
            <NavLink to={"/dashboard"} className="text-white p-[8px] text-[18px] hover:text-[#17a2b8]">Dashboard</NavLink>
            <NavLink to={"/posts"} className="text-white p-[8px] text-[18px] hover:text-[#17a2b8]">Posts</NavLink>
          </li>
          <li>
            <NavLink to="/register"  className="text-white p-[8px]  text-[18px] hover:text-[#17a2b8]">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login"  className="text-white p-[8px] text-[18px] hover:text-[#17a2b8]">Login</NavLink>
          </li>
        </ul>
      </div>
    </div>
      
    </> 
  );
};

export default Navbar;
