import { FieldArray } from "formik";
import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";
import SelectSupCategories from "../../atoms/Select/SupCategorySelect";
import type { Product, ProductImage } from "./Main";

function MainData({ update }: { update?: Product | null }) {
  const existingImages: ProductImage[] = update?.images ?? [];

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
      {existingImages.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium">الصور الحالية</p>
          <div className="flex gap-3 flex-wrap">
            {existingImages.map((img: ProductImage) => (
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
        {({ push, form }) => (
          <div>
            <p className="mb-3 text-sm font-medium">صور المنتج</p>

            <div className="grid grid-cols-2 gap-4">
              {(form.values.images as (File | null)[]).map((_, index: number) => (
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
