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

const Certificate = ({ handleSaveData }) => {
    const router = useRouter();
    const imageNode = useRef();
    const renderNode = useRef();
    const { userInfoForStore } = useContext(AppContext);
    const [isUserInfoSaved, setIsUserInfoSaved] = useState(false);
    const [isError, setIsError] = useState(false);
    const [certificateData, setCertficateData] = useState(null);
    const [isLoadedCertificate, setIsLoadedCertificate] = useState(false);
    const [isUserPhotoLoad, setUserPhotoLoad] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

    const [certificatePath, setCertificatePath] = useState(null);

    const shareUrl =
        appBaseUrl +
        (appBaseUrl.endsWith("/") == true ? "" : "/") +
        "certificate/" +
        certificatePath;

    const imageName = userInfoForStore.name + "_banner_" + Date.now() + ".png";
    const imageRef = ref(storageRef, imageName);

    // generate image
    useEffect(() => {
        if (isLoadedCertificate && isUserPhotoLoad) {
            domtoimage
                .toPng(imageNode.current)
                .then((dataUrl) => {
                    setCertficateData(dataUrl);
                    uploadString(imageRef, dataUrl, "data_url").then(
                        (snapshot) => {
                            getDownloadURL(imageRef).then((url) => {
                                setUploadedImageUrl(url);
                            });
                        }
                    );
                })
                .catch((err) => {
                    console.log("image error", err);
                });
        }
    }, [isLoadedCertificate, isUserPhotoLoad]);

    useEffect(() => {
        // save user info into firestore
        const saveInDb = async (userData) => {
            try {
                setIsUserInfoSaved(false);
                setIsError(false);

                const userDoc = await setDoc(doc(usersRef, certificatePath), {
                    name: userData.name,
                    phoneNumber: userData.phoneNumber,
                    imageUrl: uploadedImageUrl,
                    id: certificatePath,
                    customId: certificatePath,
                });

                setIsUserInfoSaved(true);
                handleSaveData();
                // router.push(`/certificate/${certificatePath}`);
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
        if (certificatePath === null) {
            setCertificatePath(uid(32));
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
                <article className="mb-6 text-center">
                    <h2 className="text-lg">আপনাকে অভিনন্দন</h2>
                </article>
                <div className="w-auto mx-auto max-w-2xl aspect-[1200/630] mb-5 lg:p-0">
                    <div
                        ref={imageNode}
                        className="relative max-w-2xl aspect-[1200/630] h-auto"
                    >
                        <img
                            src="/assets/images/banner.jpg"
                            alt="certificate"
                            className="block object-cover w-full h-full mx-auto mb-4 lg:mb-8"
                            onLoad={() => setIsLoadedCertificate(true)}
                        />
                        <div className="absolute flex items-center w-full space-x-2 md:space-x-4 bottom-3 left-4 lg:left-8">
                            {userInfoForStore.userPhoto && (
                                <img
                                    src={userInfoForStore.userPhoto}
                                    alt="quiz participant"
                                    className="object-cover w-8 h-8 border border-white rounded-full md:border-2 md:w-14 md:h-14 lg:w-20 lg:h-20"
                                    width="80"
                                    height="80"
                                    onLoad={() => setUserPhotoLoad(true)}
                                />
                            )}
                            <h3 className="z-50 text-xs text-white uppercase md:font-semibold md:text-sm lg:text-lg whitespace-nowrap">
                                {userInfoForStore?.name}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-0 space-y-3 lg:justify-center lg:space-y-0 lg:mt-8 lg:space-x-6 lg:flex-row">
                    <div>
                        <a
                            href={certificateData}
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
                            <span className="flex items-center justify-center bg-blue-800 text-center text-white w-[250px] py-2.5 rounded-3xl mx-auto  transition ">
                                শেয়ার করুন
                                <img
                                    src="/assets/images/share_icon.svg"
                                    alt="share icon"
                                    className="w-4 inline-block ml-1.5"
                                />
                            </span>
                        </SharePage>
                        {/* <div className={clsx('absolute inset-0  bg-gray-100 opacity-40')}></div> */}
                    </div>

                    {/* <Link to="/">
                        <Button>অংশগ্রহণ করুন</Button>
                    </Link> */}
                </div>
            </CenterWrapper>
        </>
    );
};

export default Certificate;
