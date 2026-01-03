import MainUsers from "../../components/templates/users/Main";

type Countries_TP = {
    title: string;
};
function Users({ title }: Countries_TP) {
    return (
        <>

            <title>{title}</title>

            <div>
                <MainUsers />

            </div>
        </>
    );
}

export default Users;