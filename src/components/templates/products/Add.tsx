import { Form, Formik, FieldArray } from "formik";
import MainData from "./MainData";
import { useMutate } from "../../hooks/useMutate";
import { HandleBackErrors } from "../../../utils/HandleBackErrors";
import { Button } from "../../atoms/buttons/Button";
import { OuterFormLayout } from "../../molecules/OuterFormLayout";
import { notify } from "../../../utils/toast";

type AddProductProps = {
  refetch: () => void;
  update: any;
};

function Add({ refetch, update }: AddProductProps) {
  const initialValues = {
    name: update?.original?.name || "",
    description: update?.original?.description || "",
    price: update?.original?.price || "",
    stock: update?.original?.stock || "",
    sub_category_id: update?.original?.sub_category_id || "",
    images: [], // دايمًا فاضية – existing images للعرض فقط
  };

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
    endpoint: `products/${update?.original?.id}`,
    method: "patch",
    formData: true,
    onSuccess: () => {
      notify("success", "Product updated successfully");
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message);
    },
  });

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
    };

    if (update?.original?.id) {
      updateProduct(payload);
    } else {
      mutate(payload);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
