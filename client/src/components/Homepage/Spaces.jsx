import React, { useState, useEffect } from "react";
import styles from "../../styles/Spaces.module.css";

const spaces = [
  {
    id: 1,
    title: "Creative Studio",
    description:
      "Open-concept workspace perfect for creative teams and brainstorming sessions.",
    image: "https://i.postimg.cc/Y2Q6XSCg/istockphoto-1317893331-612x612.jpg",
    capacity: "4-12 people",
    amenities: ["High-speed WiFi", "Whiteboard walls", "Coffee bar"],
  },
  {
    id: 2,
    title: "Executive Suite",
    description:
      "Private, elegant space for meetings, presentations, and focused work.",
    image: "https://i.postimg.cc/SNrWht8x/istockphoto-1953260993-612x612.jpg",
    capacity: "2-6 people",
    amenities: ["4K Display", "Soundproofing", "Catering available"],
  },
  {
    id: 3,
    title: "Collaboration Zone",
    description:
      "Versatile area designed for team projects and collaborative sessions.",
    image: "https://i.postimg.cc/j2YzspZL/istockphoto-1450789015-612x612.jpg",
    capacity: "8-20 people",
    amenities: ["Modular furniture", "AV equipment", "Natural lighting"],
  },
  {
    id: 4,
    title: "Focus Pods",
    description: "Individual workspaces for deep concentration and privacy.",
    image: "https://i.postimg.cc/3xx2JCCC/istockphoto-1318513469-612x612.jpg",
    capacity: "1-2 people",
    amenities: [
      "Noise cancellation",
      "Ergonomic chairs",
      "Personal climate control",
    ],
  },
];

const Spaces = () => {
  const [activeSpace, setActiveSpace] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSpace((prev) => (prev + 1) % spaces.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.spacesSection} id="spaces">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Discover Our <span className={styles.highlight}>Spaces</span>
        </h2>
        <p className={styles.sectionSubtitle}>
          Find the perfect environment for your team and workflow
        </p>

        <div className={styles.spacesDisplay}>
          <div className={styles.spacesNav}>
            {spaces.map((space, index) => (
              <button
                key={space.id}
                className={`${styles.navButton} ${
                  index === activeSpace ? styles.active : ""
                }`}
                onClick={() => setActiveSpace(index)}
              >
                {space.title}
              </button>
            ))}
          </div>

          <div className={styles.spacesContent}>
            {spaces.map((space, index) => (
              <div
                key={space.id}
                className={`${styles.spaceCard} ${
                  index === activeSpace ? styles.active : styles.inactive
                }`}
              >
                <div className={styles.spaceInfo}>
                  <h3 className={styles.spaceTitle}>{space.title}</h3>
                  <p className={styles.spaceDescription}>{space.description}</p>
                  <div className={styles.spaceDetails}>
                    <div className={styles.spaceCapacity}>
                      <h4>Capacity</h4>
                      <p>{space.capacity}</p>
                    </div>
                    <div className={styles.spaceAmenities}>
                      <h4>Amenities</h4>
                      <ul>
                        {space.amenities.map((amenity, i) => (
                          <li key={i}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className={styles.bookButton}>Book Now</button>
                </div>
                <div className={styles.spaceImageContainer}>
                  <img
                    src={space.image}
                    alt={space.title}
                    className={styles.spaceImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spaces;
