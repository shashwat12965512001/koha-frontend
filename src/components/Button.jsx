// src/components/Button.jsx
import React from "react";

const Button = ({ type = "button", children, onClick, variant = "primary" }) => {
    const base = "px-4 py-2 font-semibold rounded shadow";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${base} ${variants[variant]}`}
        >
            {children}
        </button>
    );
};

export default Button;
