import { toast } from "react-toastify";
import type {
  ToastOptions as ToastOptions_TP,
  ToastPosition,
} from "react-toastify";

const toastOptions: ToastOptions_TP = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
};

const STYLES = {
  success: "text-black",
  error: "bg-black text-white",
  info: "bg-gray-300 text-white",
};

type ToastType = keyof typeof STYLES;

export const notify = (
  type: ToastType = "success",
  msg?: string,
  position: ToastPosition = "top-right"
) => {
  let message = msg || "Successful operation";

  if (type === "error" && !!msg) {
    message = "Something went wrong";
  }
  const className = STYLES[type];

  toast[type](message, {
    ...toastOptions,
    className,
    position,
  });
};
