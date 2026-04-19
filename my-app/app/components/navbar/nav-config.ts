import {
  Home,
  User,
  Briefcase,
  FileText,
  Mail,
  LayoutDashboard,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../icon/brandIcons";

export const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/services", label: "Services", icon: Wrench },
  { href: "/projects", label: "Projects", icon: Briefcase },
  { href: "/skills", label: "Skills", icon: FileText },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export const socialLinks = [
  { href: "https://github.com", label: "GitHub", icon: GithubIcon },
  { href: "https://linkedin.com", label: "LinkedIn", icon: LinkedinIcon },
  { href: "https://twitter.com", label: "Twitter", icon: TwitterIcon },
];

export const navConfig = {
  name: "Ethian",
  title: "Full Stack Developer",
};
