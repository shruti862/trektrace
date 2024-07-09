import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCities } from "../Context/CitiesContext";
CityItem.propTypes = {
  city: PropTypes.shape({
    cityName: PropTypes.string,
    country: PropTypes.string,
    emoji: PropTypes.string,
    date: PropTypes.string,
    notes: PropTypes.string,
    position: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
    id: PropTypes.string,
  }),
};
const flagemojiToPNG = (flag) => {
  if (!flag || typeof flag !== "string") {
    return <span>No flag available</span>; // or return null, or a default image
  }
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();
  const { cityName, emoji, date, id, position } = city;
  const { deleteCity } = useCities();

  const hasValidPosition =
    position &&
    typeof position.latitude === "number" &&
    typeof position.longitude === "number";
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={
          hasValidPosition
            ? `${id}?lat=${position.latitude}&lng=${position.longitude}`
            : "#"
        }
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
