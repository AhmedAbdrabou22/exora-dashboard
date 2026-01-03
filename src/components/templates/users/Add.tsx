import { Form, Formik } from "formik";
import MainData from "./MainData";
import { useMutate } from "../../hooks/useMutate";
import { HandleBackErrors } from "../../../utils/HandleBackErrors";
import { Button } from "../../atoms/buttons/Button";
import { OuterFormLayout } from "../../molecules/OuterFormLayout";
import { notify } from "../../../utils/toast";
import type { User } from "./Main";

type FormValues = {
  id?: number;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  f_name: string;
  l_name: string;
};


type AddRoomType_TP = {
  refetch: () => void;
  update?: User | null;
};
function Add({ refetch, update }: AddRoomType_TP) {
  const initialValues: FormValues = {
    id: update?.id,
    name: update?.name || "",
    email: update?.email || "",
    phone_number: update?.phone_number || "",
    f_name: update?.f_name || "",
    l_name: update?.l_name || "",
    password: "",
    password_confirmation: "",
  };

  const { mutate, isLoading } = useMutate({
    mutationKey: ["auth/register"],
    endpoint: `auth/register`,
    onSuccess: () => {
      refetch();

    },
    onError: (err) => {
      notify('error', err?.response?.data?.message)

    },
    formData: true,
  });
  const { mutate: PostUpdate, isLoading: updateLoading } = useMutate({
    mutationKey: ["auth/register"],
    endpoint: `auth/register/${update?.id}`,
    method: "post",
    onSuccess: () => {
      refetch();

    },
    onError: (err) => {
      notify('error', err?.response?.data?.message)
    },
    formData: true,
  });

  const handleSubmit = (values: FormValues) => {
    if (update?.id) {
      const { password, password_confirmation, ...rest } = values;

      PostUpdate({
        ...rest,
        ...(password && {
          password,
          password_confirmation,
        }),
        method: "patch",
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
              <MainData />
            </OuterFormLayout>
          </HandleBackErrors>
        </Form>
      </Formik>
    </>
  );
}

export default Add;

