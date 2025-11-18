"use client";

import { forwardRef } from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    error?: string; 
}

const InputText = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, name, error, className = "", ...rest }, ref) => {
        return (
        <div className="Form-Item">
            <label htmlFor={name}>{label}</label>
            <input
            id={name}
            name={name}
            ref={ref}
            className={`Input ${error ? "border-red-200!" : ""} ${className}`}
            {...rest}
            />
            {error && <small className="text-red-500 mt-1!">{error}</small>}
        </div>
        );
    }
);

InputText.displayName = "InputText";
export default InputText;
