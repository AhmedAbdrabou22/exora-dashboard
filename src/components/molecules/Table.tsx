import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";
import { Spinner } from "../atoms/Loading"; // أي Spinner عندك
import clsx from "clsx";

type TableMeta<T> = {
    onDisplay?: (row: T) => void;
};

type TableProps<T extends object> = {
    data: T[];
    columns: ColumnDef<T, unknown>[];
    onDisplay?: (row: T) => void;
    isLoading?: boolean;
    isFetching?: boolean;
};

export function Table<T extends object>({
    data,
    columns,
    onDisplay,
    isLoading = false,
    isFetching = false,
}: TableProps<T>) {
    const table = useReactTable<T>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: { onDisplay } satisfies TableMeta<T>,
    });

    return (
        <div className="relative overflow-x-auto rounded-xl  bg-white shadow-sm">
            {/* Overlay للـ fetching */}
            {isFetching && !isLoading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                    <Spinner />
                </div>
            )}

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <Spinner />
                </div>
            ) : (
                <table className="min-w-full border-collapse">
                    {/* ================= Header ================= */}
                    <thead className="bg-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-4 py-3 text-sm font-semibold text-black text-right border-b border-gray-300"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>

                    {/* ================= Body ================= */}
                    <tbody>
                        {table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-6 text-center text-sm text-black"
                                >
                                    لا توجد بيانات
                                </td>
                            </tr>
                        )}

                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className={clsx("hover:bg-gray-100 transition-colors cursor-pointer", {
                                    "opacity-50": isFetching,
                                })}
                                onClick={() => table.options.meta?.onDisplay?.(row.original)}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="px-4 py-3 text-sm text-black text-right border-b border-gray-300"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
