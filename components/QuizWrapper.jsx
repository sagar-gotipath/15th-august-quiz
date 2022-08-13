import { uid } from "uid";
import clsx from "clsx";
import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import { useState } from "react";
import CenterWrapper from "./CenterWrapper";
import Certificate from "./Certificate";
import { AppContext } from "../pages";
import { useRouter } from "next/router";
import Spinner from "./Spinner";

const banglaNumericValue = [
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
    "১০",
    "১১",
    "১২",
    "১৩",
    "১৪",
];

const QuizWrapper = ({ Quizes }) => {
    const router = useRouter();
    const [isCheckingAnswer, setIsChecking] = useState(false);
    const [quizIndex, setQuizIndex] = useState(0);
    const [correctAnsIndex, setCorrectAnsIndex] = useState(null);
    const [wrongAnsIndex, setWrongAnsIndex] = useState(null);
    const [isHint, setIsHint] = useState(false);
    const [isDataSaved, setIsDataSaved] = useState(false);

    // custom document id
    // const uidString = uid(16);

    // console.log(uidString);

    const handleSaveData = () => {
        setIsDataSaved(true);
    };

    // handler function
    const handleCheckAnswer = (ansIndex) => {
        console.log(quizIndex);
        if (quizIndex + 1 >= Quizes.length) {
            setQuizIndex(quizIndex + 1);
            // router.push(`/certificate/${uidString}`);
        } else if (Quizes[quizIndex].answers[ansIndex].isCorrect === true) {
            setCorrectAnsIndex(ansIndex);
            setWrongAnsIndex(null);
            setIsHint(false);
            const audio = new Audio("/assets/audio/right_sound.mp3");
            audio.play();
            setIsChecking(true);
            setTimeout(() => {
                setQuizIndex(quizIndex + 1);
                setCorrectAnsIndex(null);
                setIsChecking(false);
            }, 1000);
        } else {
            setWrongAnsIndex(ansIndex);
            setIsHint(true);
            const audio = new Audio("/assets/audio/error_sound.mp3");
            audio.play();
        }
    };
    return (
        <CenterWrapper>
            {quizIndex < Quizes.length ? (
                <div>
                    <img
                        src="/assets/images/mujib.png"
                        alt="mujib logo"
                        className="block w-24 mx-auto mb-16"
                    />
                    <article className="relative p-8 mb-6 text-center bg-white border rounded-md border-neutral-300">
                        <h3 className="text-2xl font-semibold">
                            {Quizes[quizIndex].question}
                        </h3>
                        <div className="absolute top-0 px-2 py-1 text-sm text-white -translate-x-1/2 -translate-y-1/2 bg-orange-600 w-36 rounded-2xl inset-x-1/2">
                            প্রশ্ন {banglaNumericValue[quizIndex]}/১৪
                        </div>
                    </article>

                    <section className="flex flex-wrap justify-between">
                        {Quizes[quizIndex].answers.map((item, index) => {
                            return (
                                <button
                                    className={clsx(
                                        " p-4 rounded-md mb-8  border w-[48%] cursor-pointer text-left font-semibold",
                                        index !== wrongAnsIndex &&
                                            "border-neutral-300 bg-white",
                                        index === wrongAnsIndex &&
                                            "border-red-400 bg-red-600/20 custom-animation animate-error-blink",
                                        index === correctAnsIndex &&
                                            "border-green-400 bg-green-600/20"
                                    )}
                                    key={index}
                                    onClick={() => handleCheckAnswer(index)}
                                    disabled={isCheckingAnswer}
                                >
                                    {item.text}
                                </button>
                            );
                        })}
                    </section>

                    <div className="flex items-center justify-center h-7">
                        {wrongAnsIndex !== null && (
                            <p className="text-xs text-center text-gray-500">
                                আপনার উত্তর টি সঠিক নয় | পরবর্তী প্রশ্নে যেতে
                                সঠিক উত্তরটি নির্বাচন করুন{" "}
                            </p>
                        )}
                    </div>
                    {isHint && (
                        <div className="p-4 my-3 text-sm border border-green-400 rounded-md bg-green-600/20 text-bg-green-600">
                            <span className="font-semibold">
                                সঠিক উত্তরের ইঙ্গিতঃ{" "}
                            </span>{" "}
                            {Quizes[quizIndex].hint}
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative">
                    <Certificate handleSaveData={handleSaveData} />
                    {!isDataSaved && (
                        <div className="fixed inset-0 flex items-center justify-center space-x-2 bg-black/50">
                            <Spinner />
                            <span className="text-white">
                                Processing your certificate...
                            </span>
                        </div>
                    )}
                </div>
            )}
        </CenterWrapper>
    );
};

export default QuizWrapper;
