import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import PropTypes from "prop-types";
import { useCities } from "../Context/CitiesContext";

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  const countries = cities?.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else {
      return arr;
    }
  }, []);
  //   const countries = new Set(
  //     cities?.map((city) => ({ country: city.country, emoji: city.emoji }))
  //   );
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
