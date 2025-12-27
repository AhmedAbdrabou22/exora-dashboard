import { FieldArray } from "formik";
import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";
import SelectSupCategories from "../../atoms/Select/SupCategorySelect";

function MainData({ update }: { update: any }) {
  return (
    <div className="space-y-6">
      <BaseInput
        name="name"
        type="text"
        label="اسم المنتج"
        placeholder="ادخل اسم المنتج"
      />

      <BaseInput
        name="description"
        type="textarea"
        label="الوصف"
        placeholder="ادخل وصف المنتج"
      />

      <div className="grid grid-cols-2 gap-4">
        <BaseInput
          name="price"
          type="number"
          label="السعر"
          placeholder="ادخل السعر"
        />

        <BaseInput
          name="stock"
          type="number"
          label="الكمية"
          placeholder="ادخل الكمية"
        />
      </div>

      <SelectSupCategories
        name="sub_category_id"
        label="التصنيف"
        placeholder="اختر التصنيف"
        required
      />

      {/* Existing images (edit mode) */}
      {update?.original?.images?.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">الصور الحالية</p>
          <div className="flex gap-3 flex-wrap">
            {update.original.images.map((img: any) => (
              <img
                key={img.id}
                src={img.image_path}
                alt="product"
                className="h-20 w-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      <FieldArray name="images">
        {({ push, remove, form }) => (
          <div>
            <p className="mb-3 text-sm font-medium">صور المنتج</p>

            <div className="grid grid-cols-2 gap-4">
              {form.values.images.map((_: any, index: number) => (
                <FileInput
                  key={index}
                  name={`images.${index}`}
                  label={`صورة ${index + 1}`}
                  accept="image/*"
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => push(null)}
              className="mt-3 px-4 py-2 text-sm bg-black text-white rounded-md"
            >
              إضافة صورة
            </button>
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default MainData;
