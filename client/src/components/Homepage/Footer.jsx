import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <footer className={`${styles.footer} ${isVisible ? styles.visible : ""}`}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <h2 className={styles.footerLogo}>Orbit</h2>
            <p className={styles.footerTagline}>
              Find your perfect workspace, anytime, anywhere.
            </p>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h3>Company</h3>
              <ul>
                <li>
                  <a href="#" className={styles.footerLink}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3>Services</h3>
              <ul>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Coworking Spaces
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Meeting Rooms
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Event Spaces
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Virtual Offices
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.linkColumn}>
              <h3>Support</h3>
              <ul>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className={styles.footerLink}>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.newsletter}>
          <h3>Subscribe to our newsletter</h3>
          <p>Stay updated with the latest workspace trends and offers</p>
          <form className={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.emailInput}
              required
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Orbit. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
