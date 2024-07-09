/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./PhotoModal.module.css";

const PhotoModal = ({ show, photos, initialIndex, handleClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : photos.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < photos.length - 1 ? prevIndex + 1 : 0
    );
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <button className={styles.prevButton} onClick={handlePrev}>
          &lt;
        </button>
        <div className={styles.photoWrapper}>
          <button className={styles.closeButton} onClick={handleClose}>
            &times;
          </button>
          <img
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            className={styles.photo}
          />
        </div>
        <button className={styles.nextButton} onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PhotoModal;
