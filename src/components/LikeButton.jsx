import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

export default function LikeButton({ postId, token, userId }) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
//   useEffect(() => {
//     const fetchPostData = async () => {
//       try {
//         const res = await axios.get(
//           `https://nt-devconnector.onrender.com/api/posts/${postId}`,
//           {
//             headers: { "x-auth-token": token },
//           }
//         );
//         setLikeCount(res.data.likes.length);
//         setLiked(res.data.likes.some((like) => like.user === userId));
//       } catch (error) {
//         console.error("Post malumotini olishda xato:", error);
//       }
//     };
//     fetchPostData();
//   }, [postId, token, userId]);
  const handleLike = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/like/${postId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      toast.success("Like bosildi!");
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.error("Like bosishda xatolik:", error.response?.data || error);
      toast.error(error.response?.data?.msg || "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };
  const handleUnlike = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://nt-devconnector.onrender.com/api/posts/unlike/${postId}`,
        {},
        {
          headers: { "x-auth-token": token },
        }
      );
      toast.success("Like olib tashlandi!");
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } catch (error) {
      console.error("Unlike bosishda xatolik:", error.response?.data || error);
      toast.error(error.response?.data?.msg || "Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        className={`p-2  flex items-center gap-2 ${
          liked ? "bg-blue-500 cursor-not-allowed text-white" : "bg-gray-300 "
        }`}
        disabled={loading || liked}
      >
        <BiSolidLike />
        Like
        {likeCount > 0 && (
          <span className="text-lg font-semibold">{likeCount} </span>
        )}
      </button>
      <button
        onClick={handleUnlike}
        className={`p-2 flex items-center gap-2 ${
          !liked ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 text-white"
        }`}
        disabled={loading || !liked}
      >
        <BiSolidDislike />
        Unlike
      </button>
    </div>
  );
}
