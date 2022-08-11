import React from "react";
import clsx from "clsx";

const Button = ({
    children,
    className = "bg-orange-600",
    onClick = () => {},
    type = "button",
}) => {
    return (
        <button
            className={clsx(
                "text-center text-white w-[250px] py-2.5 rounded-3xl mx-auto block transition ",
                className
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
