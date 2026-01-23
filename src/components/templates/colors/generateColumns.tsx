import { type ColumnDef } from "@tanstack/react-table";
import UpdateCity from "./UpdateCity";
import DeleteCity from "./Delete";

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
        header: "name",
        accessorKey: "name",
        cell: ({ getValue }) => <span>{getValue<string>()}</span>,

        },
        {
            header: "hex_code",
            accessorKey: "hex_code",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
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
                        
                        info={row}
                       
                    />
                </div>
            )

        },
    ];