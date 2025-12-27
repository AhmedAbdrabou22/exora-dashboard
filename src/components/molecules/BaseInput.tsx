import { useField } from "formik";
import type { InputHTMLAttributes } from "react";

type BaseInputProps_TP = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label?: string;
    id?: string;
    className?: string;
};

export const BaseInput = ({
    name,
    label,
    id,
    className = "",
    ...props
}: BaseInputProps_TP) => {
    const [field, meta] = useField(name);

    return (
        <div className="mb-4 text-right">
            {label && (
                <label
                    htmlFor={id || name}
                    className="block text-sm font-medium text-black mb-1"
                >
                    {label}
                </label>
            )}
            <input
                {...field}
                {...props}
                id={id || name}
                className={`w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black bg-white text-black placeholder-gray-500 ${className}`}
            />
            {meta.touched && meta.error && (
                <div className="mt-1 text-sm text-black">
                    {meta.error}
                </div>
            )}
        </div>
    );
};
