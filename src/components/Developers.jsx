import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Developers = () => {
  const [profile, setProfile] = useState([]); // Profile massiv ekanligiga ishonch hosil qilish
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let storedToken = localStorage.getItem("token") || token;

        if (!storedToken) {
          setError("Token topilmadi, iltimos qayta login qiling.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://nt-devconnector.onrender.com/api/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": storedToken,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.msg || "Noma’lum xatolik yuz berdi!");
        }

        setProfile(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Xatolik:", err);
        setError(
          err.message || "Server yoki API bilan bog‘liq muammo yuzaga keldi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p className="text-red-500">❌ {error}</p>;
  if (profile.length === 0)
    return (
      <p className="text-yellow-500">⚠ Profil ma'lumotlari mavjud emas!</p>
    );

  

  return (
    <>
      <Navbar />

      <div className="bg-white p-4 ml-[220px] rounded-lg">
        <h2 className="text-[#17a2b8]   text-[50px] font-bold">Developers</h2>
        <div className="flex items-center py-2 ">
          <FaUser className="mr-3 w-6 h-6" />
          <h2 className="text-xl py-[15px]">
            Browse and connect with developers
          </h2>
        </div>
        {profile.map((item) => (
          <div
            key={item._id}
            className=" border bg-[#f4f4f4]  border-[#ccc;] flex  w-[955px] h-[248px] mb-[16px] items-center"
          >
            <div className="w-[214px] h-[214px] m-[15px]  flex flex-col items-center">
              <img
                className="w-[214px] h-[214px] rounded-[100px]"
                src={item.user.avatar}
                alt=""
              />
            </div>
            <div className="w-[428px]  h-[174px] m-[15px]">
              <h3 className="text-[24px] font-[600]">{item.user.name}</h3>
              <p className="text-[#aaa] text-[14px] my-[5px]  h-[30px]">
                {item.status} at {item.company}
              </p>
              <p className="h-[30px] my-[16px]">{item.location}</p>
              <div className="flex gap-[8px]">
                <button
                  onClick={() => ProfileClick(item.user._id)}
                  className="w-[119px] cursor-pointer bg-[#17a2b8] text-white h-[38.4px] p-[7px] border-[#17a2b8]"
                >
                  View Profile
                </button>
              </div>
            </div>
            <div className="w-[214px] flex items-center cursor-pointer overflow-hidden h-[174px]">
              <ul className="text-[#17a2b8] flex flex-col">
                {item.skills.slice(0, 4).map((skill, index) => (
                  <li key={index} className="flex items-center ">
                    <ImCheckmark className="mr-2" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Developers;

// import React, { useState, useEffect, useContext } from "react";
// import AuthContext from "../context/AuthContext";
// import Navbar from "./Navbar";
// import Loading from "./Loading";
// import { FaUser } from "react-icons/fa";
// import { ImCheckmark } from "react-icons/im";
// import axios from "axios";

// const Developers = () => {
//   const [profile, setProfile] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { token } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const storedToken = localStorage.getItem("token") || token;
//         if (!storedToken) {
//           setError("Token topilmadi, iltimos qayta kiring.");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(
//           "https://nt-devconnector.onrender.com/api/profile",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "X-Auth-Token": storedToken,
//             },
//           }
//         );

//         setProfile(Array.isArray(res.data) ? res.data : [res.data]);
//       } catch (err) {
//         console.error("Xatolik:", err);
//         setError(
//           err.message || "Server yoki API bilan bog‘liq muammo yuz berdi."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [token]);

//   const handleProfileClick = async (userId) => {
//     try {
//       const res = await axios.get(
//         `https://nt-devconnector.onrender.com/api/profile/user/${userId}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-Auth-Token": token,
//           },
//         }
//       );

//       setSelectedUser(res.data);
//     } catch (error) {
//       console.error("User ma'lumotlarini olishda xatolik yuz berdi:", error);
//     }
//   };

//   if (loading) return <p className="text-gray-700">⏳ Yuklanmoqda...</p>;
//   if (error) return <p className="text-red-500">⚠ Xatolik: {error}</p>;
//   if (profile.length === 0)
//     return (
//       <p className="text-yellow-500">⚠ Profil ma'lumotlari mavjud emas!</p>
//     );

//   return (
//     <>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen p-8">
//         <h2 className="text-[#17a2b8] text-[50px] font-bold">Developers</h2>
//         <div className="flex items-center py-2">
//           <FaUser className="text-blue-500 text-2xl mr-2" />
//           <h2 className="text-xl font-semibold">
//             Browse and connect with developers
//           </h2>
//         </div>

//         {profile.map((item) => (
//           <div
//             key={item._id}
//             className="border bg-white shadow-lg p-6 mb-4 flex items-center rounded-xl transition-transform transform hover:scale-105"
//           >
//             {/* Profile Picture */}
//             <div className="w-32 h-32 flex items-center justify-center">
//               <img
//                 className="w-full h-full object-cover rounded-full border-4 border-blue-400"
//                 src={item.user.avatar}
//                 alt={item.user.name}
//               />
//             </div>

//             {/* Profile Info */}
//             <div className="w-2/3 p-4">
//               <h3 className="text-xl font-semibold">{item.user.name}</h3>
//               <p className="text-gray-600 text-sm">{item.status}</p>
//               <p className="text-gray-500 text-xs">{item.location}</p>
//               <button
//                 onClick={() => handleProfileClick(item.user._id)}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//               >
//                 View Profile
//               </button>
//             </div>

//             <div className="ml-auto w-1/3">
//               <h4 className="font-semibold">Skills:</h4>
//               <ul>
//                 {item.skills.slice(0, 4).map((skill, index) => (
//                   <li key={index} className="flex items-center text-gray-700">
//                     <ImCheckmark className="text-green-500 mr-2" />
//                     {skill}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}

//         {/* Modal - User Info */}
//         {selectedUser && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-2xl font-semibold mb-2">
//                 {selectedUser.user?.name}
//               </h2>
//               <p>
//                 <strong>Status:</strong> {selectedUser.status || "N/A"}
//               </p>
//               <p>
//                 <strong>Company:</strong> {selectedUser.company || "N/A"}
//               </p>
//               <p>
//                 <strong>Location:</strong> {selectedUser.location || "N/A"}
//               </p>
//               <button
//                 onClick={() => setSelectedUser(null)}
//                 className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Yopish
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Developers;
