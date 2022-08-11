import Plyr from "plyr";
import "/node_modules/plyr/dist/plyr.css";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CenterWrapper from "./CenterWrapper";
import { useContext } from "react";
import { AppContext } from "../pages";

const Video = ({ src }) => {
    const { setComponentIndex } = useContext(AppContext);
    const videoPlayerRef = useRef();
    const [isEnded, setIsEnded] = useState(false);

    const handleVideoEnded = () => {
        console.log("clicked");
        setComponentIndex(2);
    };

    useEffect(() => {
        const player = new Plyr(videoPlayerRef.current);
        player.on("ended", (e) => {
            setIsEnded(true);
        });
    }, []);
    return (
        <div className="flex items-center">
            <CenterWrapper>
                <img
                    src="/assets/images/mujib.png"
                    alt="mujib logo"
                    className="block w-24 mx-auto mb-12"
                />
                <h2 className="mb-10 text-2xl text-center">
                    সম্পূর্ণ ভিডিওটি দেখে কুইজ শুরু করুন
                </h2>
                <div className="w-full max-w-2xl lg:w-[650px] rounded-md overflow-hidden">
                    <div
                        className="!rounded-lg plyr__video-embed"
                        id="player"
                        ref={videoPlayerRef}
                        data-plyr-provider="youtube"
                        controls
                        data-plyr-embed-id="hS5CfP8n_js"
                        style={{}}
                    >
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/hS5CfP8n_js"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="autoplay;"
                            allowFullScreen
                            resetonend="true"
                        ></iframe>
                    </div>
                </div>

                <div className="pt-14 ">
                    {isEnded ? (
                        <button
                            className={clsx(
                                "bg-orange-600 tex text-white w-[250px] py-2.5 rounded-3xl mx-auto block transition cursor-pointer"
                            )}
                            onClick={handleVideoEnded}
                        >
                            কুইজ শুরু করুন
                        </button>
                    ) : (
                        <button
                            className={clsx(
                                "bg-orange-600 tex text-white w-[250px] py-2.5 rounded-3xl mx-auto block transition opacity-50"
                            )}
                            disabled={true}
                            onClick={() => console.log("disabled btn")}
                        >
                            কুইজ শুরু করুন
                        </button>
                    )}
                </div>
            </CenterWrapper>
        </div>
    );
};

export default Video;

// <ReactPlayer
//                 className="react-player"
//                 url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
//                 width="100%"
//                 height="100%"
//             />
