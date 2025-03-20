import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import Loading from "./Loading";
import LikeButton from "./LikeButton";
import AuthContext from "../context/AuthContext";
import { useGetPostsQuery } from "../redux/getPosts";

const Card = () => {
  // const { postId } = useParams();
  // const navigate = useNavigate();
  // const [post, setPost] = useState(null);
  // const [error, setError] = useState(null);
  // const [comments, setComments] = useState([]);
  // const [text, setText] = useState("");
  // const { user, token } = useContext(AuthContext);
  // const [loading, setLoading] = useState(true);

  const { data, error, isLoading } = useGetPostsQuery();

  console.log(data);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setError("Siz tizimga kirmagansiz. Iltimos, login qiling!");
  //       setTimeout(() => navigate("/login"), 2000);
  //       return;
  //     }

  //     try {
  //       const res = await axios.get(
  //         `https://nt-devconnector.onrender.com/api/posts/${postId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "X-Auth-Token": token,
  //           },
  //         }
  //       );
  //       setPost(res.data);
  //       setComments(res.data.comments);
  //     } catch (err) {
  //       console.error("Post ma'lumotini olishda xatolik:", err);
  //       setError("Ma’lumot olishda xatolik yuz berdi!");
  //     }
  //   };

  //   fetchPost();
  // }, [postId, navigate]);

  if (error) return <p>{error}</p>;
  if (isLoading) return <Loading />;

    const [addPost] = useAddPostMutation();
  
    const formRef = useRef();
  
    const handleSubmit = async () => {
      e.preventDefault();
  
      const text = formRef.current.text.value.trim();
      if (!text.trim()) {
        console.error("Matn bo‘sh bo‘lishi mumkin emas!");
        return;
      }
  
      try {
        const response = await addPost({ text: "yangi post" }).unwrap();
        console.log("Post qo‘shildi:", response);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);

  //     const res = await axios.post(
  //       `https://nt-devconnector.onrender.com/api/posts/comment/${postId}`,
  //       { text },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Auth-Token": token,
  //         },
  //       }
  //     );

  //     toast.success("Komment muvaffaqiyatli qo'shildi!");
  //     setComments([...comments, res.data]);
  //     setText("");
  //   } catch (error) {
  //     console.error(
  //       "Xatolik:",
  //       error.response?.data?.msg || "Noma'lum xatolik!"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleDeleteComment = async (commentId) => {
  //   try {
  //     await axios.delete(
  //       `https://nt-devconnector.onrender.com/api/posts/comment/${postId}/${commentId}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Auth-Token": token,
  //         },
  //       }
  //     );

  //     setComments(comments.filter((comment) => comment._id !== commentId));
  //     toast.success("Komment o‘chirildi!");
  //   } catch (error) {
  //     console.error(
  //       "Xatolik:",
  //       error.response?.data?.msg || "Komment o‘chirilmadi!"
  //     );
  //   }
  // };

  return (
    <>
      <Navbar />
      <div>
        <button
          className="border-[#f4f4f4] ml-[220px] cursor-pointer w-[150px] h-[40px] my-[20px] bg-[#f4f4f4]"
          type="submit"
        >
          <a href="/posts">Back To Posts</a>
        </button>
        <div className="bg-white p-4 ml-[220px] rounded-lg">
          <div className="border border-[#ccc;] flex w-[1037.5px] h-[164.5px] mb-[16px] items-center">
            <div className="w-[177px] h-[132px] m-[15px] flex flex-col items-center">
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
              <div className="flex gap-[8px] items-center">
                {/* <LikeButton postId={post._id} token={token} /> */}
                <button className="w-[119px] bg-[#17a2b8] text-white h-[38.4px] p-[7px] border-[#17a2b8]">
                  Discussion
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-[#17a2b8] text-[30px] font-bold">Comments</h2>
          <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Comment the post"
              rows="3"
              className="w-[1036px] outline-none p-2 border rounded"
            />
            <button
              className=" cursor-pointer w-[100px] h-[40px] my-[10px] bg-[#343a40] text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className=" w-[1036px]">
            {/* {comments.length === 0 ? (
              <p className="text-gray-500">Hali hech qanday komment yo‘q.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment?._id}
                  className="bg-gray-100 h-[164.5px] p-2 rounded flex items-center"
                >
                  <div className="w-[177px] h-[132px] m-[15px] flex flex-col items-center">
                    <img
                      className="w-[100px] h-[100px] rounded-full mr-2"
                      src={comment?.avatar}
                      alt="User"
                    />
                    <p className="text-[#17a2b8] text-[18px] font-[700]">
                      {comment.name}
                    </p>
                  </div>
                  <div className="w-[712px] h-[125px] m-[15px]">
                    <h3 className="my-[16px]">{post.text}</h3>
                    <p className="text-[#aaa] text-[14px] mb-[5px]">
                      Posted on{" "}
                      {new Date(post.date).toLocaleDateString("uz-UZ")}
                    </p>

                    {user && comment.user === user._id && (
                      <button
                        className="bg-red-500 w-[100px] h-[40px] text-white border-red-500"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        O‘chirish
                      </button>
                    )}
                  </div>
                </div>
              ))
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
