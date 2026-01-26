import MainCategories from "../../components/templates/categories/Main";
import MainContacts from "../../components/templates/contacts/Main";

type Countries_TP = {
    title: string;
};
function Contacts({ title }: Countries_TP) {
    return (
        <>
            
                <title>{title}</title>
           
            <div>
                {/* <MainCategories /> */}
                <MainContacts/>
            </div>
        </>
    );
}

export default Contacts;