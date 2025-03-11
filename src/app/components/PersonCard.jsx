'use client';

import { useState } from 'react';
import styles from '../Card.module.css';

export default function PersonCard({ person, fetchData }) {
  const [activeProperty, setActiveProperty] = useState('name');

  if (!person) return <p>No user data available.</p>;

  const iconConfig = [
    { property: 'name', icon: '👤', text: "Hi, my name is" },
    { property: 'email', icon: '✉️', text: "My email address is" },
    { property: 'birthday', icon: '🎂', text: "My birthday is" },
    { property: 'phone', icon: '📞', text: "My phone number is" },
    { property: 'password', icon: '🔒', text: "My password is" }
  ];

  const activeText =
    iconConfig.find((item) => item.property === activeProperty)?.text ||
    'Hi, my name is';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {/* If you eventually include picture data from your API, update the src accordingly */}
        <img
          src={person.picture}
          alt="Profile"
          className={styles.profileImage}
        />
      </div>

      <div className={styles.infoSection}>
        <h2>{activeText}</h2>
        <p className={styles.propertyValue}>{person[activeProperty]}</p>
      </div>

      <div className={styles.iconGrid}>
        {iconConfig.map(({ property, icon }) => (
          <button
            key={property}
            className={`${styles.iconButton} ${
              activeProperty === property ? styles.active : ''
            }`}
            onMouseEnter={() => setActiveProperty(property)}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* The only "Get New User" button */}
      <button className={styles.refreshButton} onClick={fetchData}>
        🔄 Get New User
      </button>
    </div>
  );
}