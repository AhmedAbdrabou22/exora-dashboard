import SelectCategories from "../../atoms/Select/CategorySelect";
import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";


function MainData({update}) {


  return (
    <div>
      <BaseInput name="name_ar" type="text" label="الاسم بالعربي" placeholder="ادخل الاسم" />
      <BaseInput name="name_en" type="text" label="الاسم بالإنجليزي" placeholder="ادخل الاسم" />
      <SelectCategories
        name="category_id"
        label="التصنيف"
        placeholder="اختر التصنيف"
        required
      />

      <FileInput name="image" label="الصورة" accept="image/*" placeholder="اختر صورة" existingFile={update?.original.image} />
    </div>
  );
}

export default MainData;
