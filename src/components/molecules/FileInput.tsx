import { useFormikContext, getIn } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { FiUpload, FiX } from "react-icons/fi";

interface FileInputProps {
    name: string;
    label: string;
    accept?: string;
    placeholder?: string;
    existingFile?: string;
}

function FileInput({
    name,
    label,
    accept,
    placeholder,
    existingFile,
}: FileInputProps) {
    const { setFieldValue, values, errors, touched } =
        useFormikContext<Record<string, any>>();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(existingFile || null);

    // ✅ الحل هنا
    const selectedFile = getIn(values, name) as File | null;
    const hasError = getIn(touched, name) && getIn(errors, name);

    useEffect(() => {
        if (selectedFile instanceof File) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);

            return () => URL.revokeObjectURL(objectUrl);
        }

        if (!selectedFile && existingFile) {
            setPreview(existingFile);
        }
    }, [selectedFile, existingFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFieldValue(name, file);
    };

    const handleRemoveFile = () => {
        setFieldValue(name, null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="mb-6 text-right">
            <label className="block text-sm font-medium text-black mb-3">
                {label}
            </label>

            <div className="relative">
                <input
                    ref={fileInputRef}
                    id={name}
                    name={name}
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="hidden"
                />

                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-full px-6 py-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-3 transition-all duration-200
            ${hasError
                            ? "border-black bg-gray-50"
                            : preview
                                ? "border-black bg-white"
                                : "border-gray-300 bg-white hover:border-black"
                        }`}
                >
                    {preview ? (
                        <img
                            src={preview}
                            className="h-24 w-24 object-cover rounded-md"
                            alt="preview"
                        />
                    ) : (
                        <>
                            <FiUpload className="w-8 h-8 text-gray-400" />
                            <span className="text-sm font-medium text-gray-600">
                                {placeholder || "اضغط لاختيار ملف"}
                            </span>
                            {accept && (
                                <span className="text-xs text-gray-400">{accept}</span>
                            )}
                        </>
                    )}
                </button>

                {preview && (
                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="absolute top-2 left-2 p-1.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                        title="إزالة الملف"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                )}
            </div>

            {hasError && (
                <p className="mt-2 text-sm text-black flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-black rounded-full"></span>
                    {String(getIn(errors, name))}
                </p>
            )}
        </div>
    );
}

export default FileInput;
