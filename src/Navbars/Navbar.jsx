import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart, faTimes, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Advert from "../Advert/Advert";
import icon from "../Navbars/icon.png";
import cart from "./cart..svg";
import menus from "./menu-svgrepo-com.svg";
import { Link, NavLink, Outlet } from "react-router-dom";
import { auth, signOutUser } from "../firebase";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import account from "./account.svg";
import "./Navbar.css";
import "./Navbarresponsive.css";
import wigwonderlogo from '../Footer/1-removebg-preview.png'
import shoppingcart from '../Navbars/shopping-cart.png'

function Navbar() {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitleFromPath(location.pathname);
  }, [location]);

  const getTitleFromPath = (path) => {
    switch (path) {
      case "/":
        return "100% Human Hair Online Store | Official Website | Best Sellers | Virgin Hair Outlet";
      case "/Shop":
        return "Lace Front Wigs | Wig Lace Front | Human Hair Wig Shop | Wigwonderland Hair";
      case "/NewIn":
        return "HD Closure & Frontal";
      case "/Contact":
        return "Contact Us | Wigwonderland";
      case "/cart":
        return "Product Cart - Wigwonderland Hair";
      case "/Login":
        return "Login";
      case "/reset-password":
        return "Reset Password";
      case "/registration":
        return "Registration";
      default:
        return "Wigwonderland, Lace Front Wigs, Bundles, Luxury Wigs, Affordable Wigs, Premium Hair, Beauty";
    }
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhotoURL, setUserPhotoURL] = useState(account);

  const linkeds = () => {
    const documentHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    const scrollToPosition = documentHeight / 5;

    window.scrollTo({
      top: scrollToPosition,
      behavior: "smooth",
    });

    linked();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);

      if (user) {
        setUserEmail(user.email);

        const newUserPhotoURL = user.photoURL || account;
        setUserPhotoURL(newUserPhotoURL);
      } else {
        setUserEmail("");
        setUserPhotoURL(account);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUserEmail("");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const linked = () => {
    setMenuVisible(false);
  };

  return (
    <div className="Navbar-cons">
      <div
        className={`dropdownmenu-container ${isMenuVisible ? "appear" : ""}`}
      >
        <div className="wigstationlogo">
          <div>
            <img src={icon} alt="wigwonderland icon" />
            <h1>Wigwonderland</h1>
          </div>
          <div className="Cancelmenu">
            <button onClick={closeMenu}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        <div className="menu">
          <div className="menu-div">
            <ol>
              <li>
                <NavLink onClick={linked} exact to="/" className="NavLink">
                  HOME
                </NavLink>
                <span></span>
              </li>
              <li>
                <NavLink onClick={linkeds} className="NavLink">
                  BEST SELLER
                </NavLink>
                <span></span>
              </li>
              <li>
                <NavLink onClick={linked} to="/Shop" className="NavLink">
                  SHOP
                </NavLink>
                <span></span>
              </li>
              <li>
                <NavLink onClick={linked} to="/NewIn" className="NavLink">
                  HD CLOSURE & FRONTAL
                </NavLink>
                <span></span>
              </li>

              <li>
                <NavLink onClick={linked} to="/Contact" className="NavLink">
                  CONTACT
                </NavLink>
                <span></span>
              </li>
            </ol>

            <div className="Navbar-login">
              {isLoggedIn ? (
                <span className="log" onClick={handleLogout}>
                  Log Out
                </span>
              ) : (
                <Link onClick={linked} to="/Login" className="log">
                  Log In
                </Link>
              )}
            </div>
            <span>
              <a
                className="instagram"
                onClick={linked}
                href="https://www.instagram.com/the_wig_wonderland?igsh=YzljYTk1ODg3Zg=="
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </span>
          </div>
        </div>
      </div>
      <Advert />
      <main>
        <header className={`Navbar-con ${isScrolled ? "scrolled" : ""}`}>
          <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="dropdown" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div className="logo">
              <img src={wigwonderlogo} />
            </div>

            <ul className="links">
              <li>
                <NavLink onClick={closeMenu} exact to="/" className="NavLink">
                  HOME
                </NavLink>
              </li>
              <li>
                <NavLink onClick={linkeds} className="NavLink">
                  BEST SELLER
                </NavLink>
              </li>
              <li>
                <NavLink onClick={linked} to="/Shop" className="NavLink">
                  SHOP
                </NavLink>
              </li>
              <li>
                <NavLink onClick={linked} to="/NewIn" className="NavLink">
                  HD CLOSURE & FRONTAL
                </NavLink>
              </li>

              <li>
                <NavLink onClick={linked} to="/Contact" className="NavLink">
                  CONTACT
                </NavLink>
              </li>
            </ul>

            <div className="dropdowncart">
              <div className="collapsible-container">
                <FontAwesomeIcon icon={faUser} />
                <p className="profile">{userEmail}</p>
              </div>

              <div className="cart-container">
                <NavLink onClick={linked} to="/cart" className="NavLink">
                  <div className="cart">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </div>
                </NavLink>
              </div>
            </div>
          </nav>
        </header>
      </main>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Navbar;
