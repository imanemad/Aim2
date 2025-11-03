"use client";

import React, { useState, useEffect, forwardRef } from "react";

interface InputPriceProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  value?: number | string;
  onChange?: (value: number) => void;
}

const convertToEnglishNumbers = (input: string): string => {
  const persian = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input.replace(/[۰-۹]/g, (d) => persian.indexOf(d).toString());
};

const formatWithCommas = (value: string): string => {
  if (!value) return "";
  if (value.endsWith(".")) return value;

  const [integer, decimal] = value.split(".");
  const cleanInt = integer.replace(/[^\d]/g, "");
  const formattedInt = cleanInt.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal !== undefined ? `${formattedInt}.${decimal}` : formattedInt;
};

const InputPrice = forwardRef<HTMLInputElement, InputPriceProps>(
  ({ label, name, error, required = false, onChange, value, className = "", ...rest }, ref) => {
    const [displayValue, setDisplayValue] = useState("");

    useEffect(() => {
      const newDisplay = value ? formatWithCommas(String(value)) : "";
      if (newDisplay !== displayValue) {
        setDisplayValue(newDisplay);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value;
      const englishValue = convertToEnglishNumbers(inputVal);
      const raw = englishValue.replace(/,/g, "");

      if (!/^[0-9]*\.?[0-9]*$/.test(raw)) return;

      const formatted = formatWithCommas(raw);
      setDisplayValue(formatted);

      const parsed = parseFloat(raw);
      if (onChange) onChange(isNaN(parsed) ? 0 : parsed);
    };

    return (
      <div className="Form-Item">
        <label htmlFor={name}>
          {required && <span className="text-red-500">*</span>} {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          className={`Input En ${error ? "border-red-200!" : ""} ${className}`}
          {...rest}
        />
        {error && <small className="text-red-500 mt-1!">{error}</small>}
      </div>
    );
  }
);

InputPrice.displayName = "InputPrice";
export default InputPrice;
