import * as Yup from "yup";

export type initialValue_Tp = {
  name: string;
  abbreviation: string;
  status: number;
};

export const validationSchema = () =>
  Yup.object({
    name: Yup.string().trim().required("Name (Arabic) is required"),
    mobile_number: Yup.number().required("mobile_number is required"),
    address: Yup.string().required("address is required"),
    city_id: Yup.string().trim().required("city_id is required"),

  });

export type AllRoomTypesTable_TP = initialValue_Tp;
