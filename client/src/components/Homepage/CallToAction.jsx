// CallToAction.jsx
import React from "react";
import styles from "../../styles/CallToAction.module.css";

const CallToAction = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.ctaWrapper}>
          <div className={styles.shapesContainer}>
            <div className={`${styles.shape} ${styles.shape1}`}></div>
            <div className={`${styles.shape} ${styles.shape2}`}></div>
            <div className={`${styles.shape} ${styles.shape3}`}></div>
          </div>

          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Transform Your{" "}
              <span className={styles.highlight}>Workspace</span> Experience?
            </h2>
            <p className={styles.ctaText}>
              Join thousands of professionals who've upgraded their productivity
              with our flexible workspaces. Book your first session today and
              experience the difference.
            </p>

            <div className={styles.ctaActions}>
              <button className={styles.primaryButton}>Get Started</button>
              <button className={styles.secondaryButton}>
                Schedule a Tour
              </button>
            </div>

            <div className={styles.ctaFeatures}>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <p>No membership fees</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <p>Cancel anytime</p>
              </div>
              <div className={styles.feature}>
                <div className={styles.featureIcon}>✓</div>
                <p>24/7 support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
