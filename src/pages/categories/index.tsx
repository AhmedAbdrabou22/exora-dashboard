import MainCategories from "../../components/templates/categories/Main";

type Countries_TP = {
    title: string;
};
function Categories({ title }: Countries_TP) {
    return (
        <>
            
                <title>{title}</title>
           
            <div>
                <MainCategories />
                
            </div>
        </>
    );
}

export default Categories;