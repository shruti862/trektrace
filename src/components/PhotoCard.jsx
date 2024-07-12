/* eslint-disable react/prop-types */

import styles from "./PhotoCard.module.css";

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

const PhotoCard = ({ city, onPhotoClick }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>
        {city.cityName} <span>{flagemojiToPNG(city.emoji)}</span>
      </h3>

      <div className={styles.photoContainer}>
        {city.photos?.length ? (
          city.photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              className={styles.photo}
              onClick={() => onPhotoClick(city.photos, index)}
            />
          ))
        ) : (
          <div className={styles.text}>
            No photo was uploaded by you for this trip.
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
