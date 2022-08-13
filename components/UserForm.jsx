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
            readUploadedImage(e.target.files[0]);
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
                className="mx-auto"
            />
            <form
                className="max-w-lg px-12 py-10 mx-auto bg-white rounded-lg"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-12 text-3xl text-center">
                    কুইজে অংশগ্রহণ করতে আপনার নাম এবং ফোন নাম্বার দিন
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
                        pattern="[A-Za-z\\w]+"
                        onInvalid={(e) =>
                            e.target.setCustomValidity(
                                "Enter your name without special charecter"
                            )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        className="relative w-full py-3 placeholder-transparent transition bg-transparent border px-7 border-neutral-400 rounded-3xl focus:outline-none peer"
                    />
                    <label
                        htmlFor="name"
                        className="absolute px-2 text-gray-400 transition-all bg-white left-7 -top-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0-1 peer-placeholder-shown:bg-transparent text-sm peer-placeholder-shown:text-base cursor-text"
                    >
                        নাম
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
                            e.target.setCustomValidity(
                                "Please insert a valid phone number."
                            )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        required
                        className="relative w-full px-8 py-3 placeholder-transparent transition border border-neutral-400 rounded-3xl focus:outline-none peer"
                    />
                    <label
                        htmlFor="phoneNumber"
                        className="absolute px-2 text-gray-400 transition-all bg-white left-7 -top-2.5 peer-placeholder-shown:top-3 peer-placeholder-shown:px-0-1 peer-placeholder-shown:bg-transparent text-sm peer-placeholder-shown:text-base cursor-text"
                    >
                        ফোন নাম্বার
                    </label>
                </div>

                <div className="flex items-center mb-8 space-x-6">
                    <div className="shrink-0">
                        <img
                            className="object-cover w-16 h-16 rounded-full"
                            src={
                                userInfo.userPhoto ||
                                "/assets/images/avatar.svg"
                            }
                            alt={userInfo.name}
                        />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            name="userPhoto"
                            onChange={handleChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                        />
                    </label>
                </div>
                <div className="flex justify-center">
                    <Button type="submit">অংশগ্রহণ করুন</Button>
                </div>
            </form>

            <div className="flex items-center justify-center my-10 space-x-10">
                <div>
                    <img
                        src="/assets/images/deepto_logo.png"
                        alt="deepto TV logo"
                        className="w-auto h-auto"
                    />
                </div>
                <div>
                    <img
                        src="/assets/images/gotipath_logo.png"
                        alt="deepto TV logo"
                        className="w-auto h-auto"
                    />
                </div>
            </div>
        </CenterWrapper>
    );
};

export default UserForm;
