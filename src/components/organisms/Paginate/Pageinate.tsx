import React from "react";
import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type PaginateProps = {
    pagesCount: number;
    onPageChange: (selectedItem: { selected: number }) => void;
    previousLabel?: React.ReactNode;
    nextLabel?: React.ReactNode;
    initialPage?: number;
};

const Paginate = ({
    pagesCount,
    onPageChange,
    previousLabel,
    nextLabel,
    initialPage = 0,
}: PaginateProps) => {
    return (
        <div className="flex justify-center items-center py-6">
            <ReactPaginate
                breakLabel={
                    <span className="px-3 py-2 text-black">...</span>
                }
                pageCount={pagesCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={onPageChange}
                forcePage={initialPage}
                previousLabel={
                    previousLabel || (
                        <div className="flex items-center gap-1.5">
                            <FiChevronRight className="w-4 h-4" />
                            <span className="hidden sm:inline">السابق</span>
                        </div>
                    )
                }
                nextLabel={
                    nextLabel || (
                        <div className="flex items-center gap-1.5">
                            <span className="hidden sm:inline">التالي</span>
                            <FiChevronLeft className="w-4 h-4" />
                        </div>
                    )
                }
                containerClassName="flex items-center gap-1.5"
                pageClassName="transition-all duration-200"
                pageLinkClassName="flex items-center justify-center min-w-[40px] h-[40px] px-3 border-2 border-gray-300 rounded-lg text-black font-medium hover:border-black hover:bg-gray-50 transition-all duration-200"
                activeClassName="active-page"
                activeLinkClassName="border-black bg-black text-white hover:bg-gray-900 hover:border-gray-900 shadow-lg"
                previousClassName="transition-all duration-200"
                previousLinkClassName="flex items-center justify-center min-w-[40px] h-[40px] px-4 border-2 border-gray-300 rounded-lg text-black font-medium hover:border-black hover:bg-gray-50 transition-all duration-200"
                nextClassName="transition-all duration-200"
                nextLinkClassName="flex items-center justify-center min-w-[40px] h-[40px] px-4 border-2 border-gray-300 rounded-lg text-black font-medium hover:border-black hover:bg-gray-50 transition-all duration-200"
                disabledClassName="opacity-40 cursor-not-allowed"
                disabledLinkClassName="hover:border-gray-300 hover:bg-white cursor-not-allowed"
                breakClassName="flex items-center"
            />
        </div>
    );
};

export default Paginate;