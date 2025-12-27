import type { Dispatch, SetStateAction } from "react";
import { Edit } from "../../atoms/icons/Edit";
import type { Category } from "./generateColumns";


type UpdateCity_TP = {
  refetch: () => void;
  setModel: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Category | null>>;
  info: Category; // row.original من react-table
};

function UpdateCity({
  refetch,
  setModel,
  setData,
  info,
}: UpdateCity_TP) {
  return (
    <div>
      <span>
        <Edit
          action={() => {
            setData(info);  // صححت هنا
            setModel(true);
          }}
        />
      </span>
    </div>
  );
}

export default UpdateCity;

