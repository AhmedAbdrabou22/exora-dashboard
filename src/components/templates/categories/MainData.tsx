import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";
import type { Category } from "./Main";

type MainDataProps = {
  update?: Category | null;
};

function MainData({ update }: MainDataProps) {
  console.log(update)

  return (
    <div>
      <BaseInput name="name_ar" type="text" label="الاسم بالعربي" placeholder="ادخل الاسم" />
      <BaseInput name="name_en" type="text" label="الاسم بالإنجليزي" placeholder="ادخل الاسم" />
      <FileInput name="image" label="الصورة" accept="image/*" placeholder="اختر صورة" existingFile={update?.image} />
    </div>
  );
}

export default MainData;
