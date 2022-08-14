import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../pages";
import Button from "./Button";
import CenterWrapper from "./CenterWrapper";

const defaultUserInfo = {
  name: "",
  phoneNumber: "",
  userPhoto: null,
  imageName: "",
  uid: "",
};

const UserForm = () => {
  const { setComponentIndex, handleUserData } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  // handler functions
  const handleChange = (e) => {
    if (e.target.name === "userPhoto") {
      const fileSize = e.target.files[0].size / 1024 / 1024;
      if (fileSize > 2) {
        alert("Max size 2MB");
        e.target.value = "";
        return;
      } else {
        readUploadedImage(e.target.files[0]);
      }
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const readUploadedImage = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUserInfo({ ...userInfo, userPhoto: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userInfo.slug = userInfo.name.trim().split(" ").join("-");
    handleUserData(userInfo);
    setComponentIndex(1);
    // reseting the user input fields
    setUserInfo(defaultUserInfo);
  };
  return (
    <CenterWrapper>
      <img
        src="/assets/images/mujib.png"
        alt="15 august"
        className="w-40 mx-auto mb-2"
      />
      <form
        className="max-w-lg px-10 py-6 mx-auto bg-white rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-5 text-2xl text-center">
          অংশগ্রহণ করতে আপনার নাম এবং ফোন নাম্বার দিন
        </h2>
        <div className="relative mb-5">
          <input
            type="text"
            name="name"
            id="name"
            value={userInfo.name}
            onChange={handleChange}
            placeholder="নাম"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(
                "Enter your name without special character"
              )
            }
            onInput={(e) => e.target.setCustomValidity("")}
            className="relative w-full py-3 placeholder-transparent transition bg-transparent border px-7 border-neutral-400 rounded-3xl focus:outline-none peer"
          />
          <label
            htmlFor="name"
            className="absolute px-2 text-gray-400 transition-all bg-white left-7 -top-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0-1 peer-placeholder-shown:bg-transparent text-sm peer-placeholder-shown:text-base cursor-text"
          >
            আপনার নাম
          </label>
        </div>
        <div className="relative mb-5 ">
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handleChange}
            placeholder="ফোন নাম্বার"
            pattern="01\d*"
            maxLength="11"
            minLength="11"
            onInvalid={(e) =>
              e.target.setCustomValidity("Please insert a valid phone number.")
            }
            onInput={(e) => e.target.setCustomValidity("")}
            required
            className="relative w-full px-8 py-3 placeholder-transparent transition border border-neutral-400 rounded-3xl focus:outline-none peer"
          />
          <label
            htmlFor="phoneNumber"
            className="absolute px-2 text-gray-400 transition-all bg-white left-7 -top-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0-1 peer-placeholder-shown:bg-transparent text-sm peer-placeholder-shown:text-base cursor-text"
          >
            আপনার ফোন নাম্বার
          </label>
        </div>
        <label>
          <div className="relative flex items-center px-8 pt-4 pb-2 mb-5 space-x-6 border rounded-xl border-neutral-400">
            <div className="shrink-0">
              <img
                className="object-cover w-12 h-12 rounded-full"
                src={userInfo.userPhoto || "/assets/images/avatar.png"}
                alt={userInfo.name}
              />
            </div>
            <div className="block">
              <span className="absolute px-1 text-gray-400 bg-white -top-2 left-8">
                আপনার ছবি
              </span>
              <input
                type="file"
                name="userPhoto"
                accept="image/png, image/jpeg"
                required
                onChange={handleChange}
                id="userPhoto"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 "
              />
            </div>
          </div>
        </label>
        <div className="flex justify-center">
          <Button type="submit">অংশগ্রহণ করুন</Button>
        </div>
      </form>

      <p className="pt-8 pb-2 text-2xl text-center">আয়োজনেঃ</p>
      <div className="flex items-center justify-center space-x-10">
        <a href="https://deepto.tv" target="_blank">
          <img
            src="/assets/images/deepto_logo.png"
            alt="deepto TV logo"
            className="w-auto h-auto"
          />
        </a>
        <a href="https://www.gotipath.com" target="_blank">
          <img
            src="/assets/images/gotipath_logo.png"
            alt="deepto TV logo"
            className="w-auto h-auto"
          />
        </a>
      </div>
    </CenterWrapper>
  );
};

export default UserForm;
