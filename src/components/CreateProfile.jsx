import { useState } from "react";
import { FaUser } from "react-icons/fa";
import Navbar from "./Navbar";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    skills: "",
    githubUsername: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
   
  };

  return (
    <>
      <Navbar />
      <div className="max-w-lg ml-[220px] p-6 bg-white  rounded-lg">
        <div className="bg-white  w-[1036px] ">
          <h2 className="text-[#17a2b8]  text-[50px] font-[700]">
            Create Your Profile
          </h2>
          {/* {error && <p className="text-red-500 text-center">{error}</p>} */}
          <div className="flex items-center w-[1036px] py-2 ">
            <FaUser className="mr-3 w-6 h-6" />
            <h2 className="text-[26px]  ">
              Let's get some information to make your
            </h2>
          </div>
          <p className="my-[15px]">* = required field</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 w-[1036px]  outline-hidden  "
        >
          <div className="mb-4">
            <select
              name="status"
              className="w-full p-2 border border-[#ccc] outline-hidden "
              value={formData.status}
              onChange={handleSubmit}
            >
              <option value="">* Select Professional Status</option>
              <option value="developer">Developer</option>
              <option value="junior developer">Junior Developer</option>
              <option value="senior developer">Senior Developer</option>
              <option value="manager">Manager</option>
              <option value="student">Student or Learning</option>
            </select>
            <p className="text-[#888] text-[14px]">
              Give us an idea of where you are at in your career
            </p>
          </div>
          <div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-1  text-[20px] border outline-hidden border-[#ccc] "
              placeholder="Company"
            />
            <p className="text-[#888] text-[14px]">
              {" "}
              Could be your own company or one you work for
            </p>
          </div>
          <div>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Website"
              className="w-full p-1  outline-hidden text-[20px] border border-[#ccc]"
            />
            <p className="text-[#888] text-[14px]">
              {" "}
              Could be your own or a company website
            </p>
          </div>
          <div>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-1 outline-hidden  text-[20px] border border-[#ccc]"
            />
            <p className="text-[#888] text-[14px]">
              City & state suggested (eg. Boston, MA)
            </p>
          </div>
          <div>
            <input
              type="text"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              placeholder="* Skills"
              className="w-full p-1 outline-hidden  text-[20px] border-[#ccc] border "
            />
            <p className="text-[#888] text-[14px]">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </p>
          </div>

          <div>
            <input
              type="text"
              name="githubUsername"
              value={formData.githubUsername}
              onChange={handleChange}
              placeholder="Github Username"
              className="w-full p-1 outline-hidden  text-[20px] border-[#ccc] border rounded"
            />
            <p className="text-[#888] text-[14px]">
              If you want your latest repos and a Github link, include your
              username
            </p>
            <textarea
              // value={text}
              // onChange={(e) => setText(e.target.value)}
              placeholder="A short bio of yourself"
              rows="5"
              cols="109 "
              required
              className="border border-[#ccc] text-[#888] outline-hidden mt-[20px]  text-[20px] pl-[20px] pt-[10px]"
            />
            <p className="text-[#888] text-[14px]">
              Tell us a little about yourself
            </p>
          </div>
          <div> 
            <button className="border-[#f4f4f4] border py-[5px] px-[20px] bg-[#f4f4f4]">Add Social Network Links</button>
            <span className="ml-[20px] ">Optional</span>
          </div>
          <div className="flex gap-[10px] ">
            <button
              className="border cursor-pointer w-[120px] h-[40px] my-[20px] bg-[#17a2b8] text-white"
              type="submit"
            >
              Oтправить
            </button>
            <button
              className="border-[#f4f4f4;] cursor-pointer w-[100px] h-[40px] my-[20px] bg-[#f4f4f4]"
              type="submit"
            >
              <a href="/dashboard">Go Back </a>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProfile;
