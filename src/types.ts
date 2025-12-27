import { AxiosRequestConfig, AxiosResponseHeaders, HttpStatusCode, RawAxiosResponseHeaders } from "axios"
import { FormikErrors } from "formik"
import React from "react"
import { boolean } from "yup"
// import { SlideImage } from "yet-another-react-lightbox"

/* 
permissions
*/
export type permissionsRule_TP = "OR" | "AND"

/* 
api calls
*/
export type PostedData_TP = "json" | "formData"

const postMethods_TP = {
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  // غالبا الجيت هنا عشان الاند بوينت بتاع الlogout بس
  get: "GET",
} as const

export type MutateDataParameters_TP = {
  endpointName: string
  dataType?: PostedData_TP
  values?: any
  method?: keyof typeof postMethods_TP
  axiosOptions?: AxiosRequestConfig
  editWithFormData?: boolean
}

// custom error type
export type CError_TP = {
  response: {
    data: {
      is_success: false
      status_code: HttpStatusCode //?
      message: string
      errors?: FormikErrors<{ [key: string]: string[] }>
      error?: string

    },
    status: HttpStatusCode
    statusText: string
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  }
  request: any
}

/* 
upload
*/
// custom file type
export interface CFile_TP extends File {
  src: string
  preview: string
  id: string
}



/* react-select option type */
export type SelectOption_TP = {
  id?: string | number
  value: string
  label: string
  name?: string
}

/* every email type */
// I think i can do better
export type Email_TP = `${string}@${string}.${string}`

/* 
SYSTEM ESTABLISHMENT
*/
export type Units_TP = {
  id: string,
  value: string,
  size_id: string
}
export type CategoryMainData_TP = {
  id: string | number
  name: string
  has_size: boolean
  has_selsal: boolean
  type: "multi" | "single"
  selling_type: "part" | "all"
  sizes?: CategorySize_TP[]
}

export type CategorySize_TP = {
  id: string,
  units: Units_TP[]
  type: string
  start: string
  end: string
  increase: string
  category_name: string
}
export interface Category_TP extends CategoryMainData_TP {
  items?: CategoryMainData_TP[]
}

/* 
// globals
*/

export type SetState_TP<T> = React.Dispatch<React.SetStateAction<T>>

export type Column_TP<AccessorTP> = {
  header: string,
  accessorKey?: AccessorTP,
  Cell?: unknown,
  filterKey?: any

  // id?: string,
  // Filter?: unknown,
  // dataType?: string,
  // disableFilters?: boolean,
}

export type LoginResponse = {
  token: string;
  user: object[];
};

export type LoginRequest = {
  email: string;
  password: string;
};


// types/employee.ts
export interface Employee {
  id: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  roles: string[];
  permissions: string[];
}

export interface EmployeeResponse {
  message: string;
  employee: Employee;
}



// role type
export type Role = {
  id: number;
  name: string;
  permissions: PremissionType[];
}

export type RoleResponse = {
  message: string;
  role: Role;
}


// classifaction 
export type Classifaction = {
  id: number;
  name: string;
  ingredient_category_image: string | File | null;
  description: string;
}


export type ClassifactionResponse = {
  message: string;
  classifaction: Classifaction;
}


// ../../../types.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  gender?: "male" | "female";
  profile_pic?: string | File | null;
  attachment?: string | File | null;
  status?: number;
  created_at?: string;
  addresses: Address[];
  activities: object[];
  notes: string;
}

export type CustomerResponse = {
  message: string;
  customer: Customer;
}

//ingradients type
type CreatedBy = {
  id: number;
  name: string;
  type: string;
};

export type Ingredients = {
  name: string;
  alternative_names: string;
  category_id: number;
  description: string;
  image: File | string;
  trade_name: string;
  barcode: string;
  components: string;
  origin_country: string;
  website: string;
  is_super_fine: boolean;
  is_fine: boolean;
  is_medium: boolean;
  is_coarse: boolean;
  cost_for_kg_egp: string;
  supplier_name: string;
  supplier_address: string;
  supplier_phone: string;
  supplier_email: string;
  add_percentage: string;
  max_add_rate: string;
  notes_for_rejection: string;
  max_for_warning: string;
  notes_for_warning: string;
  created_by: CreatedBy;
  status: string;
};

type Category = {
  id: number;
  name: string;
  description: string;
  ingredient_category_image: string;
};

export type IngredientResponse = Ingredients & {
  id: number;
  name: string;
  alternative_names: string;
  category: Category;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

//serivce
export interface Service {
  id: number;
  name: string;
  package_size: string;
  quantity: number;
  price: number;
}

export interface ServiceResponse {
  message: string;
  service: Service;
}


export type Evaluation = {
  id: number;
  evaluation_request: {
    id: number;
    sample_number: number;
    reviewer_name: string;
    reviewer_phone: string;
    reviewer_email: string;
    is_used:string; 
    created_by: string;
    created_at: string;
  };
  recipe: {
    id: number;
    recipe_name: string;
    usage_method: string;
    used_in: string;
  };
  got_instructions: string;
  need_more_info:string;
  taste_rating: number;
  appearance_rating: number;
  smell_rating: number;
  overall_rating: number;
  benefits: string;
  challenges: string;
  suggestions: string;
  comments: string;
  submitted_at: string; // ISO datetime string
  Performance_measurement: number;
  accept_term: 0 | 1;
};

export type EvaluationResponse = {
  message:string;
  evaluation:Evaluation;
}

//activties 
export type Activity = {
  id: string;
  name: string;
  address_id: string;
  position: string;
  logo?: string | File | null;
  attachment?: string | File | null;
}

export type City = {
  id: number;
  name: string;
}

export type Area = {
  id: number;
  name: string;
  city: string;
}

export interface Address {
  id?: number;
  address_type: string;
  name: string;
  city: City;
  area: Area;
  street: string;
  building: string;
  floor: string;
  unit: string;
  is_default?: boolean;
}

export type customerActivityT = {
  id: number;
  name: string;
  address_id: number;
  position: string;
  logo?: string | File | null;
  attachment?: string | File | null;
  address: Address;
}

export type Recipe = {
  id: number;
  final_total?:string;
  recipe_name: string;
  addition_rate: string;
  usage_method: string;
  notes: string;
  use_experts: boolean;
  wants_to_attend: boolean;
  package_quantity: number;
  shipping_type: string;
  input_type: string;
  package_size: string;
  ingredients: Ingredients[];
  logo: File | string | null;
  customer: Customer;
  customer_activity: customerActivityT;
  ingredients_cost: string;
  service_cost: string;
  shipping_cost: string;
  total_cost: string;
  status: string;
  used_in:string;
  preferred_contact_method: string;
  payment_status: string;
  experts:Expert[];
}

interface Expert {
  id: number;
  user: string;
  changes: any;
  created_at: string;
}

export type RecipeType = {
  ingredients:  Ingredient[];
  recipe_name: string;
  addition_rate: string;
  usage_method: string;
  notes: string;
  package_quantity: number;
  shipping_type: "pickup_october" | "pickup_almaza" | "delivery" ;
  input_type: "weight" | "percentage";
  package_size: string[];
  // service_cost: string;
  // shipping_cost: string;
  // total_cost: string;
}

export type Weights = Record<string, WeightData>;

type Ingredient = {
  id: number;
  quantity: number;
  // percentage: string;
  notes: string;
  is_super_fine: number;
  is_fine: number;
  is_medium: number;
  is_coarse: number;
  // scale_factor: number;
};

type WeightData = {
  ingredients: Ingredient[];
  ingredients_cost: number;
  service_cost: number;
  total_cost: number;
};


export type RecipeResponse = {
  message: string;
  recipe: Recipe;
}

export type TIngredients = {
  id: number;
  quantity: number;
  notes: string;
}


export type Shipping = {
  name: string;
  price: string;
  city: string;
  city_id: number;
  is_active: number | boolean;
}

export type ShippingResponse = {
  message: string;
  shipping: Shipping;
}

export type sampleItemT = {
  id: number;
  operation_request_price_id: number;
  component: string;
  component_text: string;
  quantity: number;
  unit_price: string;
  total_cost: string;
};


export type pricesT = {
  operation_request_id: number;
  wants_sample: number;
  sample_items?: sampleItemT[];
  subtotal: string;
  tax_value: string;
  tax_amount: string;
  total: string;
  status: "active" | "expired";
}

export type shippingAddressT = {
  address_type: string;
  name: string;
  government: string;
  city: string;
  area: string;
  street: string;
  building: string;
  floor: string;
  unit: string;
  is_default?: boolean;
}

export type CustomerExpenses = {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profile_pic: string | null | File;
  attachment?: string | File | null;
  status?: boolean;
  addresses: Address[];
  activities: customerActivityT[];
  recipes: ResipeTypeExpenses[];
  operation_requests: OperationTExpenses[];
  wallet: Wallet;
  expenses: Expenses[];
}

export type Expenses = {
  id: number;
  amount: string;
  description: string;
  status: string;
  type: string;
  date: string;
}

export type TransactionTypr = {
  id: number;
  amount: string;
  type: string;
  description: string;
  status: string;
}

export type Wallet = {
  balance: string;
  total_spent: string;
  total_paid: string;
  last_transaction_date: string | null;
  recent_transactions: TransactionTypr[];
}

export type ResipeTypeExpenses = {
  id?: number;
  recipe_name: string;
  logo: File | string | null;
  addition_rate: string;
  usage_method: string;
  notes: string;
  wants_to_attend: boolean;
  use_experts: boolean;
  package_size: string;
  package_quantity: number;
  ingredients_cost: string;
  service_cost: string;
  shipping_cost: string;
  total_cost: string;
  status: string;
  attendance_address: string;
}

export type OperationTExpenses = {
  id: number;
  prices: pricesT[];
  package_weight: string;
  weight_unit: string;
  packages_count: number;
  package_type: string;
  bundle_type: string;
  selling_unit: string;
  delivery_method: string;
  shipping_address: shippingAddressT;
  status: string;
  admin_notes: string;
  terms_accepted: boolean;
}


export type OperationT = {
  id: number;
  recipe: ResipeType;
  customer: CustomerType;
  prices: pricesT[];
  package_weight: string;
  weight_unit: string;
  packages_count: number;
  package_type: string;
  bundle_type: string;
  selling_unit: string;
  delivery_method: string;
  shipping_address: shippingAddressT;
  status: string;
  admin_notes: string;
  sample_items?: sampleItems[];
}


export type CustomerType = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  profile_pic: string | null | File;
  attachment: string | null | File;
  status: number;
}


export type ResipeType = {
  id?: number;
  recipe_name: string;
  logo: File | string | null;
  addition_rate: string;
  usage_method: string;
  notes: string;
  wants_to_attend: boolean;
  use_experts: boolean;
  package_size: string;
  package_quantity: number;
  ingredients_cost: string;
  service_cost: string;
  shipping_cost: string;
  total_cost: string;
  shipping_address: shippingAddressT;
  attendance_address: string;
}

export type OperationTResponse = {
  message: string;
  operationT: OperationT;
}


export type sampleItems = {
  component: string;
  quantity: number;
  unit_price: string;
}

export type OperationPrice = {
  operation_request_id: number;
  sample_items: sampleItems[];
  wants_sample: boolean;
  subtotal: string;
  tax_value: string;
}

export type OperationPriceResponse = {
  OperationPrice: OperationPrice;
  message: string;
}

export type PremissionType = {
  id: number;
  name: string;
}

export type permisssion = {
  name: string;
}

export type roleUser = {
  name: string;
}

export type userType = {
  email: string;
  name: string;
  id: number;
  permissions: string[];
  roles: string[];
};


export type KaratValues_TP = "24" | "22" | "21" | "18"

export type FilterValues = {
  search: string;
  permission?: string;
  role?: string;
  status?: string;
  category?:string;
  created_by?:string;
  is_active?:string;
  customer?:string;
  shippingAddress?:string;
  recipe_id?:string;
};

