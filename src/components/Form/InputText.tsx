"use client";

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
}

export default function FormInput({
    label,
    name,
    value,
    onChange,
    type = "text",
    className = "",
    }: FormInputProps) {
    return (
        <div className="Form-Item">
        <label htmlFor={name}>{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            className={`Input ${className}`}
            value={value}
            onChange={onChange}
        />
        </div>
    );
}
