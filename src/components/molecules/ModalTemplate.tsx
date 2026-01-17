
// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment } from "react";
// import type { ReactNode } from "react";
// type ModalTemplateProps_TP = {
//     isOpen: boolean;
//     onClose: React.Dispatch<React.SetStateAction<boolean>>;
//     title?: string;
//     children: ReactNode;
// };

// export const ModalTemplate = ({ isOpen, onClose, title, children }: ModalTemplateProps_TP) => {
//     return (
//         <Transition.Root appear show={isOpen} as={Fragment}>
//             <Dialog as="div" className="relative z-10000" onClose={() => onClose(false)}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 overflow-y-auto">
//                     <div className="flex min-h-full items-center justify-center text-center sm:items-center sm:p-0 m-5 md:m-0 lg-b:!relative lg-b:!m-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 scale-95"
//                             enterTo="opacity-100 scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 scale-100"
//                             leaveTo="opacity-0 scale-95"
//                         >
//                             <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                                 <div className="flex justify-between items-center">
//                                     <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
//                                         {title}
//                                     </Dialog.Title>
//                                     <button
//                                         onClick={() => onClose(false)}
//                                         className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
//                                     >
//                                         ✕
//                                     </button>
//                                 </div>
//                                 {children}
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     );
// };


import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import type { ReactNode } from "react";

type ModalTemplateProps_TP = {
    isOpen: boolean;
    onClose: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "xl" | "full";
};

const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
};

export const ModalTemplate = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalTemplateProps_TP) => {
    return (
        <Transition.Root appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10000"
                onClose={() => onClose(false)}
            >
                {/* Overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)]" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`
                  w-full
                  ${sizeClasses[size]}
                  max-h-[90vh]
                  rounded-2xl
                  bg-white
                  shadow-xl
                  flex
                  flex-col
                `}
                            >
                                {/* Header (ثابت) */}
                                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
                                    <Dialog.Title className="text-lg font-medium text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    <button
                                        onClick={() => onClose(false)}
                                        className="text-gray-400 hover:text-gray-600 transition"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Body (Scrollable) */}
                                <div className="p-6 overflow-y-auto">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
