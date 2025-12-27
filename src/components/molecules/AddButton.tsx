import { type FC } from "react";
import { FiPlus } from "react-icons/fi";

type AddButtonProps = {
    addLabel?: string;
    action?: () => void;
    className?: string;
};

export const AddButton: FC<AddButtonProps> = ({ addLabel, action, className }) => {
    return (
        <button
            onClick={action}
            className={`flex items-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ${className || ""}`}
        >
            <FiPlus className="w-5 h-5" />
            {addLabel && <span>{addLabel}</span>}
        </button>
    );
};
