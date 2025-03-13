import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Navbar from "./Navbar";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");

  useEffect(() => {
    async function getItemPosts() {
      try {
        const res = await axios.get(
          "https://nt-devconnector.onrender.com/api/posts",
          {
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": token,
            },
          }
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
        toast.error("Postlarni olishda xatolik yuz berdi!");
      } finally {
        setLoading(false);
      }
    }

    getItemPosts();
  }, [token]);
  async function handleDelete(postId) {
    try {
      setLoading(true);
      await axios.delete(
        `https://nt-devconnector.onrender.com/api/posts/${postId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": token,
          },
        }
      );

      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Post muvaffaqiyatli o‘chirildi ");
    } catch (error) {
      console.error(
        "Xatolik yuz berdi:",
        error.response?.data?.msg || "Noma'lum xatolik!"
      );
    } finally {
      setLoading(false);
    }
  }
  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://nt-devconnector.onrender.com/api/posts",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": token,
          },
        }
      );
      toast.success("Post muvaffaqiyatli qo'shildi!");
      setPosts((prevPosts) => [res.data, ...prevPosts]);
      setText("");
    } catch (error) {
      console.error(
        "Xatolik:",
        error.response?.data?.msg || "Noma'lum xatolik yuz berdi!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-4 ml-[220px] rounded-lg">
        <h2 className="text-[#17a2b8]   text-[50px] font-bold">Posts</h2>
        <div className="flex items-center py-2 ">
          <FaUser className="mr-3 w-6 h-6" />
          <h2 className="text-xl py-[15px]">Welcome to the community</h2>
        </div>
        <p className="bg-[#17a2b8] mb-[20px] w-[1037.5px] pl-[5px] flex items-center font-[600] h-[35px] text-white">
          Say Something...
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Create a post"
            rows="5"
            cols="109 "
            required
            className="border border-[#ccc] text-[#ccc ]  text-[20px] pl-[20px] pt-[10px]"
          />
          <br />
          <button
            className="border cursor-pointer w-[100px] h-[40px] my-[20px] bg-[#343a40] text-white"
            type="submit"
          >
            Submit
          </button>
        </form>

        {posts.map((post) => (
          <div
            key={post._id}
            className=" border border-[#ccc;] flex  w-[1037.5px] h-[164.5px] mb-[16px] items-center"
          >
            <div className="w-[177px] h-[132px] m-[15px]  flex flex-col items-center">
              <img
                className="w-[100px] h-[100px] rounded-[50px]"
                src={post?.avatar}
                alt=""
              />
              <p className="text-[#17a2b8] text-[18px] font-[700]">
                {post.name}
              </p>
            </div>
            <div className="w-[712px] h-[125px] m-[15px]">
              <h3 className="my-[16px]">{post.text}</h3>
              <p className="text-[#aaa] text-[14px] mb-[5px]">
                Posted on {new Date(post.date).toLocaleDateString("uz-UZ")}
              </p>
              <div className="flex gap-[8px]">
                <BiSolidLike className="w-[57px] h-[38.4px] p-[7px] border-[#f4f4f4] border bg-[#f4f4f4]" />
                <BiSolidDislike className="w-[57px] h-[38.4px] p-[7px] border-[#f4f4f4] border bg-[#f4f4f4]" />
                <button className="w-[119px] bg-[#17a2b8] text-white h-[38.4px] p-[7px] border-[#17a2b8]">
                  Discussion
                </button>
                {user && post.user === user._id && (
                  <button
                    className="bg-red-500 text-white cursor-pointer px-4 py-1"
                    onClick={() => handleDelete(post._id)}
                  >
                    O'chirish
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
