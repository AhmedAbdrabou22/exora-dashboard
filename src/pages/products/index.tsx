import MainProducts from "../../components/templates/products/Main";

type Countries_TP = {
    title: string;
};
function Products({ title }: Countries_TP) {
    return (
        <>

            <title>{title}</title>

            <div>
                <MainProducts />

            </div>
        </>
    );
}

export default Products;