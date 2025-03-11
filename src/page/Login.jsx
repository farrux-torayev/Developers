import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { login } from "../service/authService";
import Navbar from "../components/Navbar";
import { FaUser } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Barcha maydonlarni to‘ldiring!");
      return;
    }

    try {
      const response = await login(formData);
      console.log("Server javobi:", response);

      if (response?.token) {
        setToken(response.token);
        setUser(response.user || {});
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user || {}));

        navigate("/");
      } else {
        setError(response?.message || "Email yoki parol noto‘g‘ri.");
      }
    } catch (err) {
      setError("Server bilan bog‘liq xatolik. Qaytadan urinib ko‘ring.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col  p-8 ml-[200px]">
        <div className="bg-white p-4 w-[600px] rounded-lg">
          <h2 className="text-[#17a2b8]  text-[50px] font-bold">
            Sign In
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="flex items-center py-2 ">
            <FaUser className="mr-3 w-6 h-6" />
            <h2 className="text-xl py-[15px]">Sign into Your Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 outline-none text-sm border border-gray-300 rounded mb-2 bg-gray-50"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Parol"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none text-sm border border-gray-300 rounded mb-2 bg-gray-50"
                required
              />
              <button
                type="button"
                className="absolute right-[8px] top-[13px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-[80px] bg-[#17a2b8] text-white py-2 mt-[15px] hover:bg-[#138a9c] transition"
            >
              Login
            </button>
          </form>
        </div>

        <div className="bg-white w-[300px] ml-[15px]">
          <p>
            Don't have an account?{" "}
            <span
              className="text-[#17a2b8] cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
