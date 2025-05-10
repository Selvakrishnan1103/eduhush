import Footer from "./Components/Section/Footer";
import Header from "./Components/Section/Header";
import VideoList from "./Components/Section/Home";

export default function HomePage(){
  return(
    <div className="mt-20 mb-20">
      <Header />
      <VideoList />
      <Footer />
    </div>
  )
}