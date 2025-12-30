import { Form, Formik } from "formik";
import MainData from "./MainData";
import { useMutate } from "../../hooks/useMutate";
import { HandleBackErrors } from "../../../utils/HandleBackErrors";
import { Button } from "../../atoms/buttons/Button";
import { OuterFormLayout } from "../../molecules/OuterFormLayout";
import { notify } from "../../../utils/toast";
import type { Category } from "./generateColumns";

type FormValues = {
  name_ar: string;
  name_en: string;
  category_id: number | string;
  image: File | string | null;
};

type AddRoomType_TP = {
  refetch: () => void;
  update?: Category | null;
  data?: Category[];
};
function Add({ refetch, update }: AddRoomType_TP) {
  console.log("update", update)
  const initialValues: FormValues = {
    name_ar: update?.name_ar || "",
    name_en: update?.name_en || "",
    category_id: update?.category_id || "",
    image: update?.image || null,
  };
  const { mutate, isLoading } = useMutate({

    mutationKey: ["sub-categories"],
    endpoint: `sub-categories`,
    onSuccess: () => {
      refetch();
      
    },
    onError: (err) => {
      notify('error', err?.response?.data?.message)

    },
    formData: true,
  });
  const { mutate: PostUpdate, isLoading: updateLoading } = useMutate({
    mutationKey: ["sub-categories"],
    endpoint: `sub-categories/${update?.id}`,
    method:'patch',
    onSuccess: () => {
      refetch();
    
    },
    onError: (err) => {
      notify('error',err?.response?.data?.message)
    },
    formData: true,
  });

  const handleSubmit = (values: FormValues) => {

    if (update?.id) {
      PostUpdate({
        ...values,
      });
    } else {
      mutate(values);
    }
  };

  return (
    <>
      <Formik<FormValues>
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values: FormValues) => handleSubmit(values)}
      >
        <Form>
          <HandleBackErrors>
            <OuterFormLayout
              header={""}
              submitComponent={
                <Button
                  type="submit"
                  className="mr-auto mx-5 mt-8"
                  loading={isLoading || updateLoading}
                >
                  {("submit")}
                </Button>
              }
            >
              <MainData update={update} />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  );
}

export default Add; 

