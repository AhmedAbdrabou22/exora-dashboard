import { Form, Formik } from "formik";
import MainData from "./MainData";
import { useMutate } from "../../hooks/useMutate";
import { HandleBackErrors } from "../../../utils/HandleBackErrors";
import { Button } from "../../atoms/buttons/Button";
import { OuterFormLayout } from "../../molecules/OuterFormLayout";
import { notify } from "../../../utils/toast";

type AddRoomType_TP = {
  refetch: () => void;
  update: any;
  data: any;
};
function Add({ refetch, update }: AddRoomType_TP) {
  console.log("update", update)
  const initialValues = {
    name_ar: update?.name_ar || "",
    name_en: update?.name_en || "",
    image: update?.image || "",
  };
  const { mutate, isLoading } = useMutate({
    mutationKey: ["categories"],
    endpoint: `categories`,
    onSuccess: () => {
      refetch();
      
    },
    onError: (err) => {
      notify('error', err?.response?.data?.message)

    },
    formData: true,
  });
  const { mutate: PostUpdate, isLoading: updateLoading } = useMutate({
    mutationKey: ["categories"],
    endpoint: `categories/${update?.id}`,
    method:"patch",
    onSuccess: () => {
      refetch();
    
    },
    onError: (err) => {
      notify('error',err?.response?.data?.message)
    },
    formData: true,
  });

  const handleSubmit = (values) => {
    

    if (update?.id) {
      PostUpdate({
        ...values,
       
      });
    } else {
      console.log("submissionData", values);
      mutate(values);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={(values: any) => handleSubmit(values)}
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

