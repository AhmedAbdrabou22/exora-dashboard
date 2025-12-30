import { useState } from "react";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import { MdDelete, MdClose } from "react-icons/md";

import type { Product } from "./Main";

type DeleteCityProps = {
  refetch: () => void;
  info: Product;
};

function DeleteCity({ refetch, info }: DeleteCityProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const productId = info.id;

  const { mutate, isPending } = useMutate({
    mutationKey: ["products"],
    endpoint: `products/${productId}`,
    method: "delete",
    onSuccess: () => {
      refetch();
      notify("success", "Product deleted successfully!");
      setIsModalOpen(false);
    },
    onError: (err) => {
      notify("error", err?.response?.data?.message || "Failed to delete");
    },
  });

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting product with ID:", productId);
    mutate({});
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Delete Button */}
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        onClick={handleOpenModal}
      >
        <div className="bg-[#F3F6F9] p-1 rounded-md hover:bg-red-100 transition">
          <MdDelete className="text-black hover:text-red-600" />
        </div>
        <div className="text-[14px] text-black font-medium">Delete</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50"
          onClick={handleCancel}
        >
          <div
            className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Are you sure?
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Content */}
            <p className="text-gray-600 mb-6">
              You cannot go back in this process. This product will be deleted permanently.
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteCity;