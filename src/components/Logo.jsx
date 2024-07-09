import styles from "./Logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Link to="/">
        <img src="/icon.png" alt="WorldWise logo" className={styles.logo} />
      </Link>
      <span className={styles.title}>TrekTrace</span>
    </div>
  );
}

export default Logo;
