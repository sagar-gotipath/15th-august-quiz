import React from "react";

const CenterWrapper = ({ children }) => {
    return (
        <div className="max-w-screen-lg px-4 py-5 mx-auto lg:px-0">
            {children}
        </div>
    );
};

export default CenterWrapper;
