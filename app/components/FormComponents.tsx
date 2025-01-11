"use client";

import React from "react";

// FormInputProps Interface
export interface FormInputProps {
   id: string;
   label: string;
   type: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   placeholder: string;
   error?: string;
   disabled?: boolean;
}

// FormInput Component
export const FormInput = ({
   id,
   label,
   type,
   value,
   onChange,
   placeholder,
   error,
   disabled = false,
}: FormInputProps) => (
   <div className="mb-3">
      <label
         htmlFor={id}
         className="block mb-2 text-sm font-medium ">
         {label}
      </label>
      <input
         type={type}
         id={id}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         disabled={disabled}
         aria-describedby={error ? `${id}-error` : undefined}
         className={`shadow-sm   border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
            error ? "border-red-500" : "border-gray-600 dark:border-gray-200"
         }`}
      />
      {error && (
         <p
            id={`${id}-error`}
            className="text-red-500 text-sm mt-1">
            {error}
         </p>
      )}
   </div>
);

// CheckboxProps Interface
export interface CheckboxProps {
   checked: boolean;
   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   label: React.ReactNode;
   id?: string;
   disabled?: boolean;
}

// Checkbox Component
export const Checkbox = ({
   checked,
   onChange,
   label,
   id = "checkbox",
   disabled = false,
}: CheckboxProps) => (
   <div className="flex items-center">
      <input
         id={id}
         type="checkbox"
         checked={checked}
         onChange={onChange}
         disabled={disabled}
         className="w-4 h-4 border  rounded bg-gray-50 dark:bg-gray-700 focus:ring-3 focus:ring-blue-300"
      />
      <label
         htmlFor={id}
         className={`ml-2 text-sm font-medium ${
            disabled
               ? "text-gray-400 dark:text-gray-100"
               : "text-gray-500 dark:text-gray-100"
         }`}>
         {label}
      </label>
   </div>
);

// SubmitButtonProps Interface
export interface SubmitButtonProps {
   loading: boolean;
   text: string;
   disabled?: boolean;
}

// SubmitButton Component
export const SubmitButton = ({
   loading,
   text,
   disabled = false,
}: SubmitButtonProps) => (
   <button
      type="submit"
      disabled={loading || disabled}
      className={`w-full text-white dark:text-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
         loading || disabled
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      }`}>
      {loading ? "Processing..." : text}
   </button>
);
