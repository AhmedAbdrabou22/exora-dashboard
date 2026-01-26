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

export type SubCategory = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  category_id: number;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: number;
  name_ar: string;
  name_en: string;
  image: string;
  created_at: string;
  updated_at: string;
  sub_categories: SubCategory[];
};

export interface CategoryResponse {
  current_page: number;
  data: Category[];
  last_page: number;
  per_page: number;
  total: number;
}

function MainContacts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MainData, setMainData] = useState<Category | null>(null);
  const [page, setPage] = useState(1);

  const endpoint = `contacts`;

  const { data, isFetching, isLoading, refetch } = useFetch<{ data: CategoryResponse }>({
    endpoint,
    queryKey: ["contacts", page],
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
    setPage(selected + 1); // react-paginate 0-based
  };

  return (
    <>
      {/* ➕ Add */}
      {/* <div className="flex justify-end mb-4">
        <AddButton
          action={() => {
            setMainData(null);
            setIsModalOpen(true); // ✅ فتح الـ modal
          }}
          addLabel="Add"
        />
      </div> */}

      {/* 🧾 Modal */}
      <ModalTemplate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Add refetch={refetch} update={MainData} data={data?.data?.data || []} />
      </ModalTemplate>

      {/* 📊 Table */}
      <Table
        data={data?.data || []}
        columns={columns}
        isFetching={isFetching}
        isLoading={isLoading}
      />

      
        {/* <div className="flex justify-end mt-4">
          <Paginate
            pagesCount={data?.data?.last_page || 1}
            previousLabel={<PreviousPage />}
            nextLabel={<NextPaginationIc />}
            onPageChange={handlePageChange}
            initialPage={page - 1}
          />
        </div> */}
      
    </>
  );
}

export default MainContacts;
