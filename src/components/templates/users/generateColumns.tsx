import { type ColumnDef } from "@tanstack/react-table";
import UpdateCity from "./UpdateCity";
import DeleteCity from "./Delete";

type GenerateColumnsProps = {
    refetch: () => void;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMainData: React.Dispatch<React.SetStateAction<User | null>>;
};

export type User = {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    f_name: string;
    l_name: string;
};



export const generateColumns = ({
    refetch,
    setIsModalOpen,
    setMainData,
}: GenerateColumnsProps): ColumnDef<User, unknown>[] => [
        {
            header: "ID",
            accessorKey: "id",
            cell: ({ getValue }) => <span className="font-mono">{getValue<number>()}</span>,
        },
        {
            header: "Name",
            accessorKey: "name",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Email",
            accessorKey: "email",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Phone Number",
            accessorKey: "phone_number",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "First Name",
            accessorKey: "f_name",
            cell: ({ getValue }) => <span>{getValue<string>()}</span>,
        },
        {
            header: "Last Name",
            accessorKey: "l_name",
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