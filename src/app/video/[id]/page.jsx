import Footer from "@/app/Components/Section/Footer";
import Header from "@/app/Components/Section/Header";
import VideoDetails from "@/app/Components/Section/VideoDetails";

export default function VideoDetailsPage(){
    return(
        <div className="mt-20 mb-20">
            <Header />
            <VideoDetails />
            <Footer />
        </div>
    )
}