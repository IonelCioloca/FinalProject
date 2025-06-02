import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import EditProject from "./pages/EditProject";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AddProject from "./pages/AddProject";
import Header from "./components/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/new" element={<AddProject />} />
        <Route path="/admin/edit/:id" element={<EditProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
