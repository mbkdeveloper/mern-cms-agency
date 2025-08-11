import TopNavbar from "./Nav/TopNavbar";
import Header from "./Sections/Header";
import Services from "./Sections/Services";
import Projects from "./Sections/Projects";
import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import Blog from './Sections/Blog';

export default function Landing() {
  return (
    <>
      <TopNavbar />
      <Header />
      <Services />
      <Projects />
      <Blog/>
      <Contact />
      <Footer />
    </>
  );
}
