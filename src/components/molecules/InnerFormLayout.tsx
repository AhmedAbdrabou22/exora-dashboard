/////////// IMPORTS
///
import type { ReactNode } from "react";


///
/////////// Types
///
type InnerFormLayoutProps_TP = {
    title?: string | null;
    showpopuptitle?: boolean | null;
    leftComponent?: ReactNode;
    children: ReactNode;
    customStyle?: string;
    layoutStyle?: string;
    scroll?: boolean;
};
/////////// HELPER VARIABLES & FUNCTIONS
///

///
export const InnerFormLayout = ({
    title,
    showpopuptitle,
    children,
    leftComponent,
    customStyle,
    layoutStyle,
    scroll,
}: InnerFormLayoutProps_TP) => {
    ///

    return (
        <>
            {/* container */}
            <div className={`w-full  ${layoutStyle}`}>
                {title && showpopuptitle && (
                    // header
                    <div className={`flex justify-center items-center bg-gray-100 text-gray-900 dark:bg-dark-primary dark:text-white rounded-t-[1rem] lg-b:rounded-none`}>
                        <div className="flex items-center gap-x-2 p-6 font-bold">
                            <h2 className="text-xl font-bold">{title}</h2>
                        </div>
                        {leftComponent && leftComponent}
                    </div>
                )}
                {/* body */}
                <div
                    // style={{maxHeight:"calc(100vh - 20rem)" , overflow:"scroll"}}
                    className={
                        customStyle
                            ? customStyle
                            : `bg-white dark:bg-dark-tertiary text-gray-900 dark:text-white text-start rounded-lg dark:rounded-none p-0 px-6 pt-4 py-8 grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3  gap-x-4 gap-y-8 relative ${scroll ? "" : "overflow-y-scroll max-h-[35rem]"
                            }`
                    }
                >
                    {children}
                </div>
            </div>
        </>
    );
};