import MainSupCategories from "../../components/templates/supcategories/Main";

type Countries_TP = {
    title: string;
};
function SupCategories({ title }: Countries_TP) {
    return (
        <>

            <title>{title}</title>

            <div>
                {/* <MainCategories /> */}
                <MainSupCategories />

            </div>
        </>
    );
}

export default SupCategories;