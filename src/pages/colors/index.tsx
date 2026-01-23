import MainColors from "../../components/templates/colors/Main";

type Countries_TP = {
    title: string;
};
function Colors({ title }: Countries_TP) {
    return (
        <>
            
                <title>{title}</title>
           
            <div>
                <MainColors />
                
            </div>
        </>
    );
}

export default Colors;