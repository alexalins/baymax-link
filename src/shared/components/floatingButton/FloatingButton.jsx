import React from 'react';
import styles from './floatingButton.module.css';

const FloatingButton = ({ onClick, icon, label }) => {
  return (
    <button className={`${styles.floatingButton} btn-danger`} onClick={onClick}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default FloatingButton;