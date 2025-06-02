import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const location = useLocation(); // 👈 detectează ruta curentă

  const stickyRef = useRef(null);
  const navPlaceholderRef = useRef(null);
  const mainMenuRef = useRef(null);
  const donationBtnRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sticky = stickyRef.current;
    const navPlaceholder = navPlaceholderRef.current;
    const mainMenu = mainMenuRef.current;

    let lastScrollTop = 0;

    const handleScroll = () => {
      const scroll = window.scrollY;
      const headerHeight = sticky.offsetHeight;

      if (scroll > 1) {
        sticky.classList.add("fixed");
        navPlaceholder.style.height = `${headerHeight}px`;
      } else {
        sticky.classList.remove("fixed");
        navPlaceholder.style.height = "0";
      }

      if (window.innerWidth > 991) {
        const scrollingDown = scroll > lastScrollTop;
        if (scrollingDown) {
          mainMenu.classList.add("scrolled");
        } else {
          mainMenu.classList.remove("scrolled");
        }
        lastScrollTop = scroll;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔁 Animația pe butonul de donație
  useEffect(() => {
    const interval = setInterval(() => {
      if (donationBtnRef.current) {
        donationBtnRef.current.classList.add("animate");
        setTimeout(() => {
          donationBtnRef.current.classList.remove("animate");
        }, 200);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // 👇 Funcție utilă pentru clasa activă
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div ref={navPlaceholderRef} className="nav-placeholder" />
      <header ref={stickyRef} className="header sticky">
        <div className="container cstm-container-h">
          <nav className="navbar navbar-expand-lg">
            <Link to="/" className="d-lg-none logo-menu-mob">
              <img src="/MISSIO-LOGO.png" alt="logo" />
            </Link>

            <button
              className="navbar-toggler first-button"
              onClick={toggleMenu}
            >
              <div className={`animated-icon1 ${menuOpen ? "open" : ""}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>

            <div
              className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
              id="navbarNav"
            >
              <div className="w-100">
                <div ref={mainMenuRef} className="main-menu">
                  <div className="align-set-mm">
                    <Link to="/">
                      <img
                        src="/MISSIO-LOGO.png"
                        alt="logo"
                        className="logo-menu"
                      />
                    </Link>
                    <ul className="main-list">
                      {/* <li className="temp-item">
                        <a href="#">Tijdelijk menu item</a>
                      </li> */}
                      <li className={isActive("/home") ? "active" : ""}>
                        <Link to="/home">Home</Link>
                      </li>
                      <li className={isActive("/about") ? "active" : ""}>
                        <Link to="/about">About us</Link>
                      </li>
                      <li className={isActive("/projects") ? "active" : ""}>
                        <Link to="/projects">Projects</Link>
                      </li>
                      <li className={isActive("/contact") ? "active" : ""}>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li className="donation-item">
                        <a
                          href="#"
                          className="menu-donation-btn"
                          ref={donationBtnRef}
                        >
                          Get Involved
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
