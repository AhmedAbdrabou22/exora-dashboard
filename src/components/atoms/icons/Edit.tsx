import { FaRegEdit } from "react-icons/fa";

type EditProps_TP = {
  className?: string;
  action?: () => void;
  size?: number;
  title?: string; 
};

export const Edit = ({ className, action, size, title }: EditProps_TP) => {
  return (
    <div onClick={action} className="flex items-center gap-2">
      <div className="bg-[#F3F6F9] p-1 rounded-md">
        <FaRegEdit className="text-[18px] text-black" />
      </div>
      <div className="text-[14px] text-black ">
        {title || ("Edit")}
      </div>
    </div>
  );
};
