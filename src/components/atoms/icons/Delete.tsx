import { MdDelete } from "react-icons/md";

type DeleteProps_TP = {
  className?: string;
  action?: () => void;
  size?: number;
};

export const Delete = ({
  className,
  action,
  size = 18,
}: DeleteProps_TP) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={(e) => {
        e.stopPropagation();   // 🔴 مهم جدًا داخل الجداول
        action?.();
        
      }}
    >
      <div className="bg-[#F3F6F9] p-1 rounded-md hover:bg-red-100 transition">
        <MdDelete
          size={size}
          className={`text-black hover:text-red-600 ${className}`}
        />
      </div>
      <div className="text-[14px] text-black font-medium">
        Delete
      </div>
    </div>
  );
};
