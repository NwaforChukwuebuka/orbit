import React, { useState, useEffect } from "react";
import styles from "../../styles/Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director, Innovate Co.",
    content:
      "The workspace has completely transformed how our team collaborates. The creative studio inspires us daily, and the booking process couldn't be easier!",
    avatar:
      "https://i.postimg.cc/pdgjCNNq/istockphoto-1389823037-612x612-removebg-preview.png",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO, TechStart",
    content:
      "As a growing startup, we needed flexible space that could adapt to our changing needs. This platform delivers exactly that, with exceptional service every time.",
    avatar:
      "https://i.postimg.cc/nzBDwdpZ/istockphoto-1465504312-612x612-removebg-preview.png",
    rating: 5,
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Freelance Designer",
    content:
      "The focus pods are my go-to when I need to meet deadlines. Clean, quiet, and perfectly equipped. I've been more productive here than anywhere else.",
    avatar:
      "https://i.postimg.cc/pdgjCNNq/istockphoto-1389823037-612x612-removebg-preview.png",
    rating: 4,
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Project Manager, BuildRight",
    content:
      "Our team meets here weekly for planning sessions. The collaboration zones have all the tools we need, and the staff always goes above and beyond.",
    avatar:
      "https://i.postimg.cc/nzBDwdpZ/istockphoto-1465504312-612x612-removebg-preview.png",
    rating: 5,
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.testimonialsSection} id="testimonials">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          What Our <span className={styles.highlight}>Clients</span> Say
        </h2>
        <p className={styles.sectionSubtitle}>
          Trusted by professionals and teams of all sizes
        </p>

        <div className={styles.testimonialSlider}>
          <div
            className={styles.testimonialTrack}
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialCard}>
                <div className={styles.testimonialContent}>
                  <div className={styles.quoteIcon}>"</div>
                  <p className={styles.quote}>{testimonial.content}</p>
                  <div className={styles.rating}>
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.star} ${
                          i < testimonial.rating ? styles.filled : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatarContainer}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.avatar}
                    />
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{testimonial.name}</h4>
                    <p className={styles.authorRole}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.testimonialDots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === active ? styles.activeDot : ""
              }`}
              onClick={() => setActive(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
