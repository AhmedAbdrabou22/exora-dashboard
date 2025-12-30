import type { Dispatch, SetStateAction } from "react";
import { Edit } from "../../atoms/icons/Edit";
import type { Product } from "./Main";


type UpdateCity_TP = {
  setModel: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Product | null>>;
  info: Product; // row.original من react-table
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
            setData(info);  // صححت هنا
            setModel(true);
          }}
        />
      </span>
    </div>
  );
}

export default UpdateCity;

