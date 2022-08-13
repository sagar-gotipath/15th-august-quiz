import Head from "next/head";
import { createContext, useContext, useState } from "react";
import QuizWrapper from "../components/QuizWrapper";
import UserForm from "../components/UserForm";
import Video from "../components/Video";
import quizes from "../data/quizes";

export const AppContext = createContext();

export default function Home() {
    const [componentIndex, setComponentIndex] = useState(0);
    const [userInfoForStore, setUserInfoToStore] = useState({});

    const handleUserData = (userObject) => {
        setUserInfoToStore({ ...userObject });
    };
    return (
        <AppContext.Provider
            value={{
                setComponentIndex: setComponentIndex,
                handleUserData: handleUserData,
                userInfoForStore: userInfoForStore,
            }}
        >
            <>
                {componentIndex === 0 && <UserForm />}
                {componentIndex === 1 && <Video />}
                {componentIndex === 2 && <QuizWrapper Quizes={quizes} />}
            </>
        </AppContext.Provider>
    );
}
