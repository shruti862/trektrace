import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import PropTypes from "prop-types";
import Message from "./Message";
import { useCities } from "../Context/CitiesContext";
CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city, idx) => (
        <CityItem city={city} key={idx} />
      ))}
    </ul>
  );
}

export default CityList;
