import React, { useState, useEffect } from "react";
import styles from "../../styles/Header.module.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Logo />

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <a href="#features">Features</a>
            </li>
            <li>
              <a href="#spaces">Spaces</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
          </ul>
        </nav>

        <div className={styles.buttons}>
          <Link to="/login" className={styles.login}>
            Log In
          </Link>
          <Link to="/register" className={styles.signup}>
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
