import React, { useEffect, useRef } from "react";
import styles from "../../styles/Features.module.css";

const Features = () => {
  const featuresRef = useRef([]);

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

    featuresRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      featuresRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const features = [
    {
      icon: "🔍",
      title: "Easy Search",
      description:
        "Find the perfect workspace in seconds with our powerful search and filter system.",
    },
    {
      icon: "📆",
      title: "Instant Booking",
      description:
        "Book your workspace with just a few clicks, no phone calls or emails required.",
    },
    {
      icon: "💸",
      title: "Flexible Pricing",
      description:
        "Pay only for what you need, whether it's an hour, a day, or a whole month.",
    },
    {
      icon: "🔑",
      title: "Seamless Access",
      description:
        "Get instant access codes to your booked space directly on your phone.",
    },
    {
      icon: "⭐",
      title: "Verified Spaces",
      description:
        "All workspaces are thoroughly vetted to ensure high quality and amenities.",
    },
    {
      icon: "📱",
      title: "Mobile Ready",
      description:
        "Manage your bookings on the go with our responsive web app and mobile app.",
    },
  ];

  return (
    <section className={styles.features} id="features">
      <div className={styles.container}>
        <div
          className={styles.header}
          ref={(el) => (featuresRef.current[0] = el)}
        >
          <h2 className={styles.title}>
            Everything You Need to{" "}
            <span className={styles.highlight}>Work Better</span>
          </h2>
          <p className={styles.subtitle}>
            Our platform is designed with your productivity in mind, offering
            all the features you need to find and book the perfect workspace.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.feature}
              ref={(el) => (featuresRef.current[index + 1] = el)}
            >
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
