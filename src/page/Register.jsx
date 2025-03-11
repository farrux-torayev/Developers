import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { register } from "../service/authService";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Navbar from "../components/Navbar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Ism maydoni bo‘sh bo‘lishi mumkin emas.");
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      setError("Noto‘g‘ri email formati.");
      return;
    }
    if (formData.password.trim().length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak.");
      return;
    }

    const body = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    console.log("Yuborilayotgan ma'lumot:", body);

    try {
      const response = await register(body);
      console.log("Backenddan kelgan javob:", response);

      const token = response?.token;
      if (token) {
        setToken(token);
        setUser({});

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({}));

        navigate("/");
      } else {
        setError("Ro‘yxatdan o‘tishda muammo yuz berdi.");
      }
    } catch (err) {
      console.error("Ro‘yxatdan o‘tishda xato:", err);
      setError(
        "Ro‘yxatdan o‘tishda xatolik yuz berdi. Qaytadan urinib ko‘ring."
      );
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col p-8 ml-[200px]">
        <div className="bg-white p-4 w-[600px]">
          <h2 className="text-[#17a2b8] text-[50px] ml-4 font-bold">Sign Up</h2>
          <div className="flex items-center py-4 ml-4">
            <FaUser className="mr-3 w-[30px] h-[30px]" />
            <h2 className="text-[25px]">Create Your Account</h2>
          </div>

          {error && <p className="text-red-500 ml-4">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-[700px] p-2 outline-none ml-4 text-[14px] border border-gray-300 rounded mb-2 bg-gray-50"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-[700px] p-2 outline-none ml-4 text-[14px] border border-gray-300 rounded mb-2 bg-gray-50"
              required
            />
            <p className="ml-4 pb-4 text-[#888]">
              This site uses Gravatar, so if you want a profile image, use a
              Gravatar email.
            </p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-[700px] p-2 ml-4 outline-none text-[14px] border border-gray-300 rounded mb-2 bg-gray-50 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-[-140px] top-[13px]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-[100px] ml-4 bg-[#17a2b8] text-white py-2 mt-4 rounded"
            >
              Register
            </button>
          </form>
        </div>

        <div className="bg-white w-[385px] mt-4 p-2">
          <div className="flex text-center pl-6">
            <p className="pr-2">Already have an account?</p>
            <p
              className="text-[#17a2b8] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Sign In
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
