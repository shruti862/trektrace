/* eslint-disable react/prop-types */
import styles from "./Modal.module.css";

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;
  return (
    <div
      className={`${styles.modal} ${
        show ? styles.displayBlock : styles.displayNone
      }`}
    >
      <section className={styles.modalMain}>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>
        {children}
      </section>
    </div>
  );
};

export default Modal;
