import ServicesPage from "./services/page";
import ContactPage from "./contact/page";
import HomePage from "./home/page";
import ProjectsPage from "./projects/page";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <div>
      <HomePage />
      <ServicesPage />
      <ProjectsPage />
      <AboutPage />
      <ContactPage />
    </div>
  )
}