import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";


function MainData({update}) {
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
