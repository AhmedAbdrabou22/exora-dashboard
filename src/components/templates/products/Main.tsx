import { useMemo, useState } from "react";
import { Table } from "../../molecules/Table";
import { useFetch } from "../../hooks/useFetch";
import { AddButton } from "../../molecules/AddButton";
import { ModalTemplate } from "../../molecules/ModalTemplate";
import { generateColumns } from "./generateColumns";
import Add from "./Add";
import PreviousPage from "../../atoms/icons/PreviousPage";
import NextPaginationIc from "../../atoms/icons/NextPaginationIc";
import Paginate from "../../organisms/Paginate/Pageinate";

/* ===================== TYPES ===================== */

export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  is_verified: number;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Review = {
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  review: string;
  created_at: string;
  updated_at: string;
  user: User;
};

export type ProductImage = {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
};

export type SubCategory = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  sub_category_id: number;
  created_at: string;
  updated_at: string;

  rating: number;
  reviews_count: number;

  sub_category: SubCategory;
  images: ProductImage[];
  reviews: Review[];

  is_favorite: boolean;
  favorite_id: number | null;
};

export interface ProductsPaginationResponse {
  current_page: number;
  data: Product[];
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductsApiResponse {
  status: string;
  message: string;
  data: ProductsPaginationResponse;
};


function MainProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainData, setMainData] = useState<Product | null>(null);
  const [page, setPage] = useState(1);

  const endpoint = `products?page=${page}`;

  const { data, isFetching, isLoading, refetch } =
    useFetch<ProductsApiResponse>({
      endpoint,
      queryKey: ["products", page],
      // onSuccess: () => {
      //   setIsModalOpen(false)
      // }
    });

  const columns = useMemo(
    () =>
      generateColumns({
        refetch,
        setIsModalOpen,
        setMainData,
      }),
    [refetch]
  );

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1); 
  };

  return (
    <>
      {/* Add Button */}
      <div className="flex justify-end mb-4">
        <AddButton
          action={() => {
            setMainData(null);
            setIsModalOpen(true);
          }}
          addLabel="Add"
        />
      </div>

      {/* Modal */}
      <ModalTemplate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Add
          refetch={refetch}
          update={mainData}
          data={data?.data?.data || []}
        />
      </ModalTemplate>

      {/* Table */}
      <Table
        data={data?.data?.data || []}
        columns={columns}
        isFetching={isFetching}
        isLoading={isLoading}
      />

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Paginate
          pagesCount={data?.data?.last_page || 1}
          previousLabel={<PreviousPage />}
          nextLabel={<NextPaginationIc />}
          onPageChange={handlePageChange}
          initialPage={page - 1}
        />
      </div>
    </>
  );
}

export default MainProducts;
