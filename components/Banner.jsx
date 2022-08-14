import { uid } from "uid";
import domtoimage from "dom-to-image";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import React, { useState, useContext, useRef, useEffect } from "react";

import { db, storageRef } from "../firebase.config";
import Button from "./Button";
import CenterWrapper from "./CenterWrapper";
import SharePage from "./SharePage";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { AppContext } from "../pages";
import { useRouter } from "next/router";
import { appBaseUrl } from "../lib/config";

const usersRef = collection(db, "users");

const Banner = ({ handleSaveData }) => {
  const router = useRouter();
  const imageNode = useRef();
  const renderNode = useRef();
  const { userInfoForStore } = useContext(AppContext);
  const [isUserInfoSaved, setIsUserInfoSaved] = useState(false);
  const [isError, setIsError] = useState(false);
  const [bannerData, setBannerData] = useState(null);
  const [isLoadedBanner, setIsLoadedBanner] = useState(false);
  const [isUserPhotoLoad, setUserPhotoLoad] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const [bannerPath, setBannerPath] = useState(null);

  const shareUrl =
    appBaseUrl +
    (appBaseUrl.endsWith("/") == true ? "" : "/") +
    "banner/" +
    bannerPath;

  const imageName = userInfoForStore.name + "_banner_" + Date.now() + ".png";
  const imageRef = ref(storageRef, imageName);

  // generate image
  useEffect(() => {
    if (isLoadedBanner && isUserPhotoLoad) {
      const node = imageNode.current;
      const scale = 1200 / node.offsetWidth;
      domtoimage
        .toPng(node, {
          height: node.offsetHeight * scale,
          width: node.offsetWidth * scale,
          style: {
            transform: "scale(" + scale + ")",
            transformOrigin: "top left",
            width: node.offsetWidth + "px",
            height: node.offsetHeight + "px",
          },
        })
        .then((dataUrl) => {
          setBannerData(dataUrl);
          uploadString(imageRef, dataUrl, "data_url").then((snapshot) => {
            getDownloadURL(imageRef).then((url) => {
              setUploadedImageUrl(url);
            });
          });
        })
        .catch((err) => {
          console.log("image error", err);
        });
    }
  }, [isLoadedBanner, isUserPhotoLoad]);

  useEffect(() => {
    // save user info into firestore
    const saveInDb = async (userData) => {
      try {
        setIsUserInfoSaved(false);
        setIsError(false);

        const userDoc = await setDoc(doc(usersRef, bannerPath), {
          name: userData.name,
          phoneNumber: userData.phoneNumber,
          imageUrl: uploadedImageUrl,
          id: bannerPath,
          customId: bannerPath,
        });

        setIsUserInfoSaved(true);
        handleSaveData();
        // router.push(`/banner/${bannerPath}`);
      } catch (e) {
        console.error("Error adding document: ", e);
        setIsError(true);
      }
    };

    if (uploadedImageUrl !== null) {
      saveInDb(userInfoForStore);
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    if (bannerPath === null) {
      setBannerPath(uid(32));
    }
  });

  return (
    <>
      <CenterWrapper>
        <img
          src="/assets/images/mujib.png"
          alt="mujib logo"
          className="block w-24 mx-auto mb-8"
        />
        <div className="w-full mx-auto max-w-2xl">
          <div ref={imageNode} className="relative w-full">
            <img
              src="/assets/images/banner.jpg"
              alt="banner"
              className="block object-cover w-full h-auto"
              onLoad={() => setIsLoadedBanner(true)}
            />
            <div className="absolute flex items-center w-full space-x-2 md:space-x-4 bottom-3 left-4 lg:left-8">
              {userInfoForStore.userPhoto && (
                <img
                  src={userInfoForStore.userPhoto}
                  alt="quiz participant"
                  className="object-cover w-8 h-8 border border-white rounded-full md:border-2 md:w-14 md:h-14 lg:w-20 lg:h-20"
                  onLoad={() => setUserPhotoLoad(true)}
                />
              )}
              <h3 className="z-50 text-xs text-white uppercase md:font-semibold md:text-sm lg:text-lg whitespace-nowrap">
                {userInfoForStore?.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 space-y-3 lg:justify-center lg:space-y-0 lg:mt-8 lg:space-x-6 lg:flex-row">
          <div>
            <a
              href={bannerData}
              download={imageName}
              className="flex items-center justify-center px-8 bg-orange-600 rounded-full text-center text-white w-[250px] py-2.5  transition"
            >
              <span>ডাউনলোড করুন</span>
              <img
                src="/assets/images/download_icon.svg"
                alt="download icon"
                className="w-4 inline-block ml-1.5"
              />
            </a>
          </div>
          <div className="relative">
            <SharePage pageUrl={shareUrl}>
              <span className="flex items-center justify-center bg-blue-800 text-center text-white w-[250px] py-2.5 rounded-3xl mx-auto transition">
                <span>শেয়ার করুন</span>
                <img
                  src="/assets/images/share_icon.svg"
                  alt="share icon"
                  className="w-4 inline-block ml-1.5"
                />
              </span>
            </SharePage>
          </div>
        </div>
      </CenterWrapper>
    </>
  );
};

export default Banner;
