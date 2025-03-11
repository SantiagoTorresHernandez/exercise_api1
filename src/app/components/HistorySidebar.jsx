'use client';

import React from 'react';
import styles from '../Card.module.css';

export default function HistorySidebar({ personHistory, onSelect, onDelete }) {
  return (
    <div className={styles.sidebar}>
      <h3>History</h3>
      <ul className={styles.historyList}>
        {personHistory.map((person) => (
          <li key={person.email} className={styles.historyItem}>
            <span onClick={() => onSelect(person)} className={styles.historyName}>
              {person.name}
            </span>
            <button onClick={() => onDelete(person.email)} className={styles.deleteButton}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}