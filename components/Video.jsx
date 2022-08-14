import Plyr from "plyr";
import "/node_modules/plyr/dist/plyr.css";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import CenterWrapper from "./CenterWrapper";
import { useContext } from "react";
import { AppContext } from "../pages";
import Hls from "hls.js";

const Video = ({ src }) => {
    const { setComponentIndex } = useContext(AppContext);
    const videoPlayerRef = useRef();
    const [isEnded, setIsEnded] = useState(false);
    const videoSource =
        "https://toffee-spa.gotipath.com/deeptotv-live/transcoded/2022/08/14/966336/1/3/1835/manifest.m3u8";

    const handleVideoEnded = () => {
        console.log("clicked");
        setComponentIndex(2);
    };

    useEffect(() => {
        const player = new Plyr(videoPlayerRef.current);
        if (!Hls.isSupported()) {
            videoPlayerRef.current.src = videoSource;
        } else {
            const hls = new Hls();
            hls.loadSource(videoSource);
            hls.attachMedia(videoPlayerRef.current);
            window.hls = hls;
        }
        player.on("ended", (e) => {
            setIsEnded(true);
        });
    }, []);
    return (
        <CenterWrapper>
            <img
                src="/assets/images/mujib.png"
                alt="mujib logo"
                className="block w-24 mx-auto mb-10"
            />
            <h2 className="mb-10 text-2xl text-center">
                পরবর্তী ধাপে যেতে সম্পূর্ণ ভিডিওটি দেখুন
            </h2>
            <div className="w-full max-w-2xl lg:w-[650px] rounded-md overflow-hidden mx-auto">
                <video
                    className="!rounded-lg plyr__video-embed"
                    id="player"
                    ref={videoPlayerRef}
                    controls
                    crossOrigin=""
                    playsInline
                    autoPlay
                >
                    <source src={videoSource} type="Video/m3u8" />
                </video>
            </div>

            <div className="pt-14 ">
                {isEnded ? (
                    <button
                        className={clsx(
                            "bg-orange-600 tex text-white w-[250px] py-2.5 rounded-3xl mx-auto block transition cursor-pointer"
                        )}
                        onClick={handleVideoEnded}
                    >
                        পরবর্তী ধাপে যান
                    </button>
                ) : (
                    <button
                        className={clsx(
                            "bg-orange-600 tex text-white w-[250px] py-2.5 rounded-3xl mx-auto block transition opacity-50"
                        )}
                        disabled={true}
                        onClick={() => console.log("disabled btn")}
                    >
                        পরবর্তী ধাপে যান
                    </button>
                )}
            </div>
        </CenterWrapper>
    );
};

export default Video;
