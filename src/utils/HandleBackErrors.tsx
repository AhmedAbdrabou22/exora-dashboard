import type { ReactNode } from "react";
import type { FormikErrors } from "formik";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { notify } from "./toast";

type HandleBackErrorsProps_TP = {
    children: ReactNode; // هنا بدل Element
    errors?: FormikErrors<{ [key: string]: string[] }>;
};

export const HandleBackErrors = ({ children, errors }: HandleBackErrorsProps_TP) => {
    const { setFieldError } = useFormikContext();

    useEffect(() => {
        if (errors) {
            Object.entries(errors).forEach(([key, val]) => {
                if (val) {
                    if (val.length > 1) {
                        const err = val.join(" & ");
                        setFieldError(key, err);
                        notify("error", err);
                    } else {
                        const err = val[0];
                        setFieldError(key, err);
                        notify("error", err);
                    }
                }
            });
        }
    }, [errors]);

    return <>{children}</>; // تأكد من إرجاع Fragment
};
