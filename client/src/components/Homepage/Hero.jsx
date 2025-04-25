import React, { useEffect, useRef } from "react";
import styles from "../../styles/Hero.module.css";

const Hero = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1
            className={styles.title}
            ref={(el) => (elementsRef.current[0] = el)}
          >
            Find Your Perfect{" "}
            <span className={styles.highlight}>Workspace</span> Today
          </h1>
          <p
            className={styles.subtitle}
            ref={(el) => (elementsRef.current[1] = el)}
          >
            Book modern, flexible workspaces that inspire productivity and
            creativity. Whether you need a desk for a day or an office for your
            team, we've got you covered.
          </p>
          <div
            className={styles.cta}
            ref={(el) => (elementsRef.current[2] = el)}
          >
            <button className={styles.primary}>Get Started</button>
            <button className={styles.secondary}>Take a Tour</button>
          </div>
          <div
            className={styles.stats}
            ref={(el) => (elementsRef.current[3] = el)}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Spaces</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50k+</span>
              <span className={styles.statLabel}>Happy Members</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Locations</span>
            </div>
          </div>
        </div>
        <div
          className={styles.imageContainer}
          ref={(el) => (elementsRef.current[4] = el)}
        >
          <div className={styles.image}></div>
          <div className={styles.shape1}></div>
          <div className={styles.shape2}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
