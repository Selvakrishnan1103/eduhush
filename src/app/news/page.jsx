import Footer from "../Components/Section/Footer";
import Header from "../Components/Section/Header";
import News from "../Components/Section/News";

export default function NewsPage(){
    return(
        <div className="mt-20 mb-20">
            <Header />
            <News />
            <Footer />
        </div>
    )
}