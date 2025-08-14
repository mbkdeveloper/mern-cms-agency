import TopNavbar from "./Nav/TopNavbar";
import Header from "./Sections/Header";
import Services from "./Sections/Services";
import Footer from "./Sections/Footer";
import Testimonial from "./Testimonial";

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Testimonial />
      <Services />
      <Footer />
    </>
  );
}
