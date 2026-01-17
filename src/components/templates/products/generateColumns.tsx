import { type ColumnDef } from "@tanstack/react-table";
import UpdateCity from "./UpdateCity";
import DeleteCity from "./Delete";
import type { Product } from "./Main";

/* ===================== TYPES ===================== */

export type SubCategory = {
    id: number;
    name_ar: string;
    name_en: string;
    image: string;
    category_id: number;
    created_at: string;
    updated_at: string;
};

export type ProductImage = {
    id: number;
    product_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
};

type GenerateColumnsProps = {
    refetch: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMainData: React.Dispatch<React.SetStateAction<Product | null>>;
};

/* ===================== COLUMNS ===================== */

export const generateColumns = ({
    refetch,
    setIsModalOpen,
    setMainData,
}: GenerateColumnsProps): ColumnDef<Product, unknown>[] => [
        {
            header: "ID",
            accessorKey: "id",
            cell: ({ getValue }) => (
                <span className="font-mono">{getValue<number>()}</span>
            ),
        },

        {
            header: "Image",
            accessorFn: (row) => row.images?.[0]?.image_path,
            cell: ({ getValue }) =>
                getValue<string>() ? (
                    <img
                        src={getValue<string>()}
                        alt="Product"
                        className="h-15 w-15 object-cover rounded-md"
                    />
                ) : (
                    <span className="text-gray-400">—</span>
                ),
        },

        {
            header: "Name",
            accessorKey: "name",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },

        {
            header: "Price",
            accessorKey: "price",
            cell: ({ getValue }) => (
                <span className="font-semibold">{getValue<string>()} EGP</span>
            ),
        },

        {
            header: "Stock",
            accessorKey: "stock",
            cell: ({ getValue }) => (
                <span
                    className={`font-medium ${getValue<number>() > 0 ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {getValue<number>()}
                </span>
            ),
        },

        {
            header: "Sub Category",
            accessorFn: (row) => row.sub_category?.name_en,
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "التاريخ",
            accessorFn: (row) => row.created_at,
            cell: ({ getValue }) => (
                <span>{getValue<string>()?.slice(0, 10)}</span>
            ),
        },

        {
            header: "Rating",
            accessorKey: "rating",
            cell: ({ getValue }) => (
                <span className="font-medium">{getValue<number>()} ⭐</span>
            ),
        },

        {
            header: "Actions",
            accessorKey: "actions",
            cell: ({ row }) => (
                <div className="flex">
                    <UpdateCity
                        setModel={setIsModalOpen}
                        info={row.original}
                        setData={setMainData}
                    />
                    <DeleteCity
                        refetch={refetch}
                        info={row.original}
                    />
                </div>
            ),
        },
    ];
