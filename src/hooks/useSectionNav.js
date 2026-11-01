import { useLocation, useNavigate } from "react-router";

/**
 * Smooth-scroll to a section id on the home page, from anywhere in the app.
 * Falls back to navigating home first when the section isn't mounted.
 */
export default function useSectionNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return function goToSection(id) {
    const scroll = () => {
      const node = document.getElementById(id);
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (pathname === "/") {
      scroll();
      return;
    }

    navigate("/");
    window.setTimeout(scroll, 220);
  };
}
