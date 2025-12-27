import { t } from "i18next";
import { BiSend } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { RiReservedFill } from "react-icons/ri";
import { Button } from "../buttons/Button";
type Reservation_TP = {
  className?: string;
  action?: () => void;
  size?: number;
};
export const Reservation = ({ className, action, size }: Reservation_TP) => {
  return (
    <Button action={action} className="flex flex-row gap-2 p-3 px-5"
    >
      {t("Reservation")}
      <BiSend className="text-[18px] text-[#fff]" />
    </Button>
  );
};
