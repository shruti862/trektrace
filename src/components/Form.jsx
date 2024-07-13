// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../Context/CitiesContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UploadPhotos from "./UploadPhotos";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
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
  useEffect(
    function () {
      const id = Cookies.get("User");
      setUserId(id);
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingError("");

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  function formatDateToString(date) {
    const month = String(date.getDate()).padStart(2, "0");
    const day = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;
    const formattedDate = formatDateToString(new Date(date));
    const latitude = Number(lat);
    const longitude = Number(lng);
    const newCity = {
      cityName,
      country,
      emoji,
      date: formattedDate,
      notes,
      position: { latitude, longitude },
      userId,
      photos: uploadedPhotos,
    };

    await createCity(newCity);

    navigate("/app/cities");
  }

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <form
        className={`${styles.form} ${isLoading ? styles.loading : ""}`}
        onSubmit={handleSubmit}
      >
        <div className={styles.row}>
          <label htmlFor="cityName">City name</label>
          <input
            id="cityName"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
          <span className={styles.flag}>{flagemojiToPNG(emoji)}</span>
        </div>

        <div className={styles.row}>
          <label htmlFor="date">When did you go to {cityName}?</label>

          <DatePicker
            id="date"
            onChange={(date) => setDate(date)}
            selected={date}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="notes">Notes about your trip to {cityName}</label>
          <textarea
            id="notes"
            onChange={(e) => setNotes(e.target.value)}
            value={notes}
          />
        </div>
        <div className={styles.row}>
          <Button
            type="secondary"
            onClick={handlePhotoSubmit}
            disabled={uploadedPhotos.length > 0}
          >
            Click here to upload Photos
          </Button>
        </div>
        <div className={styles.buttons}>
          <Button type="primary">Add</Button>
          <BackButton />
        </div>
      </form>
      {showModal && (
        <UploadPhotos
          show={showModal}
          handleClose={handleCloseModal}
          setUploadedPhotos={setUploadedPhotos}
        />
      )}
    </>
  );
}

export default Form;
