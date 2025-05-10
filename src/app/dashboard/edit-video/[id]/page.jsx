import EditVideoForm from "@/app/Components/Section/EditVideoForm";
import Footer from "@/app/Components/Section/Footer";
import Header from "@/app/Components/Section/Header";

export default function EditVideoPage(){
    return(
        <div className="mt-22 mb-22">
            <Header />
            <EditVideoForm />
            <Footer />
        </div>
    )
}