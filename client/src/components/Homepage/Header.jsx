import React, { useState, useEffect } from "react";
import styles from "../../styles/Header.module.css";

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
        <a href="/" className={styles.logo}>
          <span className={styles.logoText}>Orbit</span>
        </a>

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
          <button className={styles.login}>Log In</button>
          <button className={styles.signup}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
