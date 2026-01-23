import { FieldArray, useFormikContext } from "formik";
import { BaseInput } from "../../molecules/BaseInput";
import FileInput from "../../molecules/FileInput";
import SelectSupCategories from "../../atoms/Select/SupCategorySelect";
import SelectColors from "../../atoms/Select/ColorsSelect";
import type { Product, ProductImage } from "./Main";
import { FiTrash2, FiPlus, FiX } from "react-icons/fi";

function MainData({ update }: { update?: Product | null }) {
  const existingImages: ProductImage[] = update?.images ?? [];
  const { values } = useFormikContext<any>();

  return (
    <div className="space-y-4">
      {/* English Information */}
      <div className="border border-gray-200 p-4 rounded-lg space-y-3">
        <h3 className="text-base font-semibold mb-2">المعلومات بالإنجليزية</h3>

        <BaseInput
          name="name"
          type="text"
          label="اسم المنتج (EN)"
          placeholder="Enter product name"
          required
        />

        <BaseInput
          name="description"
          type="textarea"
          label="الوصف (EN)"
          placeholder="Enter product description"
          required
        />
      </div>

      {/* Arabic Information */}
      <div className="border border-gray-200 p-4 rounded-lg space-y-3">
        <h3 className="text-base font-semibold mb-2">المعلومات بالعربية</h3>

        <BaseInput
          name="name_ar"
          type="text"
          label="اسم المنتج (AR)"
          placeholder="ادخل اسم المنتج"
          required
        />

        <BaseInput
          name="description_ar"
          type="textarea"
          label="الوصف (AR)"
          placeholder="ادخل وصف المنتج"
          required
        />
      </div>

      {/* Price and Stock */}
      <div className="grid grid-cols-2 gap-4">
        <BaseInput
          name="price"
          type="number"
          label="السعر"
          placeholder="ادخل السعر"
          required
        />

        <BaseInput
          name="stock"
          type="number"
          label="الكمية المتوفرة"
          placeholder="ادخل الكمية"
          required
        />
      </div>

      {/* Discount Section */}
      <div className="border border-gray-200 p-4 rounded-lg space-y-3">
        <h3 className="text-base font-semibold mb-2">الخصم</h3>

        <div className="grid grid-cols-2 gap-4">
          <BaseInput
            name="discount"
            type="number"
            label="قيمة الخصم"
            placeholder="ادخل قيمة الخصم"
          />

          <div className="flex flex-col gap-1 text-right">
            <label className="text-sm font-medium">نوع الخصم</label> 
            <select
              name="discount_type"
              value={values.discount_type}
              onChange={(e) => {
                const event = e as any;
                event.target.name = 'discount_type';
                values.discount_type = e.target.value;
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="percentage">نسبة مئوية (%)</option>
              <option value="value">مبلغ ثابت</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category */}
      <SelectSupCategories
        name="sub_category_id"
        label="التصنيف الفرعي"
        placeholder="اختر التصنيف"
        required
      />

      {/* Colors */}
      <SelectColors
        name="colors"
        label="الألوان المتاحة"
        placeholder="اختر الألوان"
        required
      />

      {/* Custom Fields */}
      <FieldArray name="custom_fields">
        {({ push, remove, form }) => (
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">خصائص مخصصة</h3>
              <button
                type="button"
                onClick={() => push({ key: "", value: "" })}
                className="px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center gap-1.5"
              >
                <FiPlus size={16} />
                إضافة
              </button>
            </div>

            <div className="space-y-2">
              {(form.values.custom_fields as { key: string; value: string }[])?.map(
                (_, index: number) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_auto] gap-2 items-end bg-gray-50 p-2 rounded-md"
                  >
                    <BaseInput
                      name={`custom_fields.${index}.key`}
                      type="text"
                      label="اسم الخاصية"
                      placeholder="مثال: Material"
                    />

                    <BaseInput
                      name={`custom_fields.${index}.value`}
                      type="text"
                      label="القيمة"
                      placeholder="مثال: Cotton"
                    />

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-2 bg-black text-white rounded-md hover:bg-gray-800 transition mb-1"
                      title="حذف"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                )
              )}

              {(!form.values.custom_fields ||
                (form.values.custom_fields as unknown[]).length === 0) && (
                  <p className="text-gray-400 text-sm text-center py-3">
                    لا توجد خصائص مخصصة
                  </p>
                )}
            </div>
          </div>
        )}
      </FieldArray>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="border border-gray-200 p-4 rounded-lg">
          <p className="mb-2 text-sm font-medium">الصور الحالية</p>
          <div className="flex gap-2 flex-wrap">
            {existingImages.map((img: ProductImage) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.image_path}
                  alt="product"
                  className="h-20 w-20 object-cover rounded-md border border-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      <FieldArray name="images">
        {({ push, remove, form }) => (
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold">صور المنتج</h3>
              <button
                type="button"
                onClick={() => push(null)}
                className="px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition flex items-center gap-1.5"
              >
                <FiPlus size={16} />
                إضافة صورة
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {(form.values.images as (File | null)[])?.map((_, index: number) => (
                <div key={index} className="relative">
                  <FileInput
                    name={`images.${index}`}
                    label={`صورة ${index + 1}`}
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-0 right-0 -mt-1 -mr-1 p-1 bg-black text-white rounded-full hover:bg-gray-800 transition"
                    title="حذف الصورة"
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>

            {(!form.values.images ||
              (form.values.images as unknown[]).length === 0) && (
                <p className="text-gray-400 text-sm text-center py-3">
                  لا توجد صور
                </p>
              )}
          </div>
        )}
      </FieldArray>
    </div>
  );
}

export default MainData;