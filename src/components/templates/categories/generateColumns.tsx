import { type ColumnDef } from "@tanstack/react-table";
import UpdateCity from "./UpdateCity";

type GenerateColumnsProps = {
    refetch: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMainData: React.Dispatch<React.SetStateAction<Category | null>>;
};
type SubCategory = {
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



export const generateColumns = ({
    refetch,
    setIsModalOpen,
    setMainData,
}: GenerateColumnsProps): ColumnDef<Category, unknown>[] => [
        {
            header: "ID",
            accessorKey: "id",
            cell: ({ getValue }) => <span className="font-mono">{getValue<number>()}</span>,
        },
        {
            header: "Image",
            accessorKey: "image",
            cell: ({ getValue }) => (
                <img
                    src={getValue<string>()}
                    alt="Category"
                    className="h-10 w-10 object-cover rounded-md"
                />
            ),
        },
        {
            header: "Name (AR)",
            accessorKey: "name_ar",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Name (EN)",
            accessorKey: "name_en",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Sub-Categories",
            accessorFn: (row) => row.sub_categories.map((sc) => sc.name_ar).join(", "),
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Actions",
            accessorKey: "actions",
            cell: ({ row }) => (
                <UpdateCity
                    refetch={refetch}
                    setModel={setIsModalOpen}
                    info={row.original}
                    setData={setMainData}
                />
            )

        },
    ];