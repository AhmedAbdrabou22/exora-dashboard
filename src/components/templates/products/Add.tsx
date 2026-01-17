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
  description: string;
  price: string;
  stock: number | string;
  sub_category_id: number | string;
  images: (File | null)[];
};

type AddProductProps = {
  refetch: () => void;
  update?: Product | null;
  data?: Product[];
};

function Add({ refetch, update, data: _data }: AddProductProps) {
  const initialValues: FormValues = {
    name: update?.name || "",
    description: update?.description || "",
    price: update?.price || "",
    stock: update?.stock || "",
    sub_category_id: update?.sub_category_id || "",
    images: [], // دايمًا فاضية – existing images للعرض فقط
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
