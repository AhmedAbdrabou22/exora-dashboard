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

export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  f_name: string;
  l_name: string;
};

export interface UserResponse {
  current_page: number;
  data: User[];
  last_page: number;
  per_page: number;
  total: number;
}

function MainUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MainData, setMainData] = useState<User | null>(null);
  const [page, setPage] = useState(1);

  const endpoint = `users?page=${page}`;

  const { data, isFetching, isLoading, refetch } = useFetch<{ data: UserResponse }>({
    endpoint,
    queryKey: ["users", page],
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
      <div className="flex justify-end mb-4">
        <AddButton
          action={() => {
            setMainData(null);
            setIsModalOpen(true); // ✅ فتح الـ modal
          }}
          addLabel="Add"
        />
      </div>

      {/* 🧾 Modal */}
      <ModalTemplate
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Add refetch={refetch} update={MainData} />
      </ModalTemplate>

      {/* 📊 Table */}
      <Table
        data={data?.data?.data || []}
        columns={columns}
        isFetching={isFetching}
        isLoading={isLoading}
      />


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

export default MainUsers;
