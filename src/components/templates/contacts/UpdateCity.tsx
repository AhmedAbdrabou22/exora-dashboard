import type { Dispatch, SetStateAction } from "react";
import { Edit } from "../../atoms/icons/Edit";
import type { Category } from "./generateColumns";


type UpdateCity_TP = {
  setModel: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Category | null>>;
  info: Category; // row.original من react-table
};

function UpdateCity({
  setModel,
  setData,
  info,
}: UpdateCity_TP) {
  return (
    <div>
      <span>
        <Edit
          action={() => {
            setData(info);  
            setModel(true);
          }}
        />
      </span>
    </div>
  );
}

export default UpdateCity;

