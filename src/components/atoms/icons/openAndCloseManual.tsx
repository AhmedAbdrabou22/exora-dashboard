import { t } from "i18next";
import { FaRegEdit } from "react-icons/fa";
type openAndCloseManualProps_TP = {
  className?: string;
  action?: () => void;
  size?: number;
  manualAction?: any;
};
export const openAndCloseManual = ({ className, action, size ,manualAction }: openAndCloseManualProps_TP) => {
  return (
    <div onClick={action} className="flex items-center  gap-2">
      <div className="bg-[#F3F6F9] p-0 rounded-md">
        <FaRegEdit className="text-[18px] text-[#B5B5C3]" />
      </div>
      <div className="text-[14px] text-[#70707e] "> {manualAction==1? t("open manually") :t("close manually")}</div>
    </div>
  );
};
