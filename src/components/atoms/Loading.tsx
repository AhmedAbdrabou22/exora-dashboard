// import { tv } from "tailwind-variants";

// const spinner = tv({
//     base: "animate-spin rounded-full border-black", // اللون الأسود دائمًا
//     variants: {
//         size: {
//             small: "h-4 w-4 border-b-2",
//             medium: "h-6 w-6 border-b-4",
//             large: "h-20 w-20 border-b-4",
//         },
//     },
//     defaultVariants: {
//         size: "medium",
//     },
// });

// export const Spinner = ({
//     size = "medium",
//     className,
// }: {
//     size?: "small" | "medium" | "large";
//     className?: string;
// }) => {
//     return (
//         <div className={`flex items-center justify-center ${className}`}>
//             <div className={spinner({ size })}></div>
//         </div>
//     );
// };

import { tv } from "tailwind-variants";

const spinner = tv({
    base: "rounded-full border-2 border-gray-200 animate-spin",
    variants: {
        size: {
            small: "h-5 w-5 border-t-2 border-t-black",
            medium: "h-8 w-8 border-t-2 border-t-black",
            large: "h-16 w-16 border-t-4 border-t-black",
        },
    },
    defaultVariants: {
        size: "medium",
    },
});

const pulseCircle = tv({
    base: "absolute rounded-full bg-black opacity-20 animate-ping",
    variants: {
        size: {
            small: "h-5 w-5",
            medium: "h-8 w-8",
            large: "h-16 w-16",
        },
    },
});

export const Spinner = ({
    size = "medium",
    className,
    withPulse = true,
}: {
    size?: "small" | "medium" | "large";
    className?: string;
    withPulse?: boolean;
}) => {
    return (
        <div className={`flex items-center justify-center ${className || ""}`}>
            <div className="relative flex items-center justify-center">
                {withPulse && <div className={pulseCircle({ size })}></div>}
                <div className={spinner({ size })}></div>
            </div>
        </div>
    );
};

// مكون إضافي للـ Loading مع نص
export const SpinnerWithText = ({
    size = "medium",
    text = "جاري التحميل...",
    className,
}: {
    size?: "small" | "medium" | "large";
    text?: string;
    className?: string;
}) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${className || ""}`}>
            <Spinner size={size} />
            <p className="text-sm font-medium text-black animate-pulse">{text}</p>
        </div>
    );
};

// مكون للـ Full Page Loading
export const FullPageSpinner = ({ text }: { text?: string }) => {
    return (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-black flex flex-col items-center gap-6">
                <Spinner size="large" />
                {text && (
                    <p className="text-base font-medium text-black">{text}</p>
                )}
            </div>
        </div>
    );
};

// مكون Dots Loading (بديل)
export const DotsLoader = ({ className }: { className?: string }) => {
    return (
        <div className={`flex items-center justify-center gap-2 ${className || ""}`}>
            <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
        </div>
    );
};