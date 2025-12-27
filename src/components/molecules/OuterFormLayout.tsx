
import type { ReactNode } from 'react';


///
type OuterFormLayout_TP = {
    children: ReactNode;
    header?: string ;
    submitComponent?: ReactNode;
    leftComponent?: ReactNode;
    className?: string;
};

export const OuterFormLayout = ({
    children,
    header,
    submitComponent,
    leftComponent,
    className,
}: OuterFormLayout_TP) => {
    /////////// VARIABLES
    ///

    ///
    /////////// CUSTOM HOOKS
    ///

    ///
    /////////// STATES
    ///

    ///
    /////////// SIDE EFFECTS
    ///

    /////////// FUNCTIONS | EVENTS | IF CASES
    ///

    ///
    return (
        <>
            <div className={`flex flex-col  ${className}`}>
                {header ? (
                    <>
                        <div className='flex justify-endcenter'>
                            <h2 className='text-2xl font-bold mb-8'>{header}</h2>
                            {leftComponent && leftComponent}
                        </div>
                    </>
                ) : (
                    ''
                )}

                <div className='rounded-lg'>{children}</div>
                <div className='general-button dark:bg-dark-tertiary'>
                    {!!submitComponent && submitComponent}
                </div>
            </div>
        </>
    );
};