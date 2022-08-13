import { uid } from "uid";
import domtoimage from "dom-to-image";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useContext, useRef, useEffect } from "react";

import { db, storageRef } from "../firebase.config";
import Button from "./Button";
import CenterWrapper from "./CenterWrapper";
import SharePage from "./SharePage";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { AppContext } from "../pages";
import { useRouter } from "next/router";
import { appBaseUrl } from "../lib/config";

const Certificate = ({ certificatePath, handleSaveData }) => {
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

    const shareUrl = appBaseUrl + "/certificate/" + certificatePath;

    const imageName =
        userInfoForStore.name || +"_certificate_" + Date.now() + ".png";
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
                const docRef = await addDoc(collection(db, "users"), {
                    name: userData.name,
                    phoneNumber: userData.phoneNumber,
                    imageUrl: uploadedImageUrl,
                    uid: certificatePath,
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

    return (
        <>
            {/* <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link
                    rel="canonical"
                    href={process.env.REACT_APP_APP_BASE_URL}
                />
                <meta name="description" content="quiz" />
                <meta property="og:title" content="15th august quiz." />
                <meta property="og:image" content={uploadedImageUrl} />
            </Helmet> */}

            {/* main content */}

            <CenterWrapper>
                <img
                    src="/assets/images/mujib.png"
                    alt="mujib logo"
                    className="block w-24 mx-auto mb-8"
                />
                <article className="mb-6 text-center">
                    <p>অভিনন্দন</p>
                    <h2 className="text-xl">আপনার সার্টিফিকেট</h2>
                </article>
                <div className="p-4 lg:p-0">
                    <div
                        className="lg:h-[460px] max-w-[646px] mx-auto"
                        ref={renderNode}
                    >
                        <div id="image" ref={imageNode} className="relative">
                            <img
                                src="/assets/images/certificate_blank.png"
                                alt="certificate"
                                className="max-w-[646px] max-h-[460px] h-auto object-cover mx-auto lg:mb-8 mb-4 w-full block"
                                onLoad={() => setIsLoadedCertificate(true)}
                            />
                            <span className="absolute z-50 text-lg italic font-bold uppercase -translate-x-1/2 -translate-y-2 font left-1/2 top-1/2">
                                {userInfoForStore?.name || "Mohammed Sagar"}
                            </span>
                            <img
                                src={
                                    userInfoForStore.userPhoto ||
                                    "/assets/images/avatar-cropped.svg"
                                }
                                alt="quiz participant"
                                className="absolute w-[120px] h-[120px] object-cover rounded-full top-14 left-16"
                                width="120"
                                height="120"
                                onLoad={() => setUserPhotoLoad(true)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-0 space-y-3 lg:space-y-0 lg:mt-8 lg:space-x-6 lg:justify-center lg:flex-row">
                    <>
                        <div>
                            <Button className="flex items-center justify-center bg-orange-600">
                                <a href={certificateData} download={imageName}>
                                    ডাউনলোড করুন
                                </a>
                                <img
                                    src="/assets/images/download_icon.svg"
                                    alt="download icon"
                                    className="w-4 inline-block ml-1.5"
                                />
                            </Button>
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
                    </>

                    {/* <Link to="/">
                        <Button>অংশগ্রহণ করুন</Button>
                    </Link> */}
                </div>
            </CenterWrapper>
        </>
    );
};

export default Certificate;
