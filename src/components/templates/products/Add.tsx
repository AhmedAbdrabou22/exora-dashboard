import { Form, Formik } from "formik";
import MainData from "./MainData";
import { useMutate } from "../../hooks/useMutate";
import { HandleBackErrors } from "../../../utils/HandleBackErrors";
import { Button } from "../../atoms/buttons/Button";
import { OuterFormLayout } from "../../molecules/OuterFormLayout";
import { notify } from "../../../utils/toast";

import type { Product } from "./Main";

type FormValues = {
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: string | number;
  stock: string | number;
  sub_category_id: string | number;
  colors: number[];
  discount: string | number;
  discount_type: string;
  custom_fields: { key: string; value: string }[];
  images: (File | null)[];
};

type AddProductProps = {
  refetch: () => void;
  update?: Product | null;
  data?: Product[];
};

function Add({ refetch, update, data: _data }: AddProductProps) {
  type FormValues = {
    name: string;
    name_ar: string;
    description: string;
    description_ar: string;
    price: string | number;
    stock: string | number;
    sub_category_id: string | number;
    colors: number[];
    discount: string | number;
    discount_type: string;
    custom_fields: { key: string; value: string }[];
    images: (File | null)[];
  };

  const initialValues: FormValues = {
    // English
    name: update?.name || "",
    description: update?.description || "",

    // Arabic
    name_ar: update?.name_ar || "",
    description_ar: update?.description_ar || "",

    // Price & Stock
    price: update?.price || "",
    stock: update?.stock || "",

    // Category
    sub_category_id: update?.sub_category_id || "",

    // Colors - استخراج الـ IDs من array الألوان
    colors: update?.colors?.map((color) => color.id) || [],

    // Discount
    discount: update?.discount || "",
    discount_type: update?.discount_type || "percentage",

    // Custom Fields - استخراج key و value فقط
    custom_fields: update?.custom_fields?.map((field) => ({
      key: field.key,
      value: field.value,
    })) || [],

    // Images - دايمًا فاضية للصور الجديدة
    images: [],
  };

  void _data;

  const { mutate, isLoading } = useMutate({
    mutationKey: ["products"],
    endpoint: "products",
    formData: true,
    onSuccess: () => {
      notify("success", "Product added successfully");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
  });

  const { mutate: updateProduct, isLoading: updateLoading } = useMutate({
    mutationKey: ["products"],
    endpoint: `products/${update?.id}`,
    method: "post",
    formData: true,
    onSuccess: () => {
      notify("success", "Product updated successfully");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
  });

  const handleSubmit = (values: FormValues) => {
    const payload = {
      ...values,
      _method: update ? "patch" : "post",
    };

    if (update?.id) {
      updateProduct(payload);
    } else {
      mutate(payload);
    }
  };

  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header=""
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mx-5 mt-8"
                  loading={isLoading || updateLoading}
                >
                  submit
                </Button>
              }
            >
              <MainData update={update} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      )}
    </Formik>
  );
}

export default Add;
