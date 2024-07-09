import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import Cookies from "js-cookie";
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
const CitiesContext = createContext();

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(function () {
    const id = Cookies.get("User");
    async function fetchCities(id) {
      try {
        setIsLoading(true);
        const res = await getDocs(collection(db, "travels"));
        const data = res.docs
          .filter((doc) => doc.data().userId === id)
          .map((doc) => {
            const cityData = doc.data();

            // if (cityData.position) {
            //   cityData.position.lat = Number(cityData.position.lat);
            //   cityData.position.lng = Number(cityData.position.lng);
            // }
            cityData.id = doc.id;
            return cityData;
          });

        setCities(data);
      } catch {
        console.log("There was an error loading cities...");
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      fetchCities(id);
    } else {
      setCities([]); // Clear cities if no user is logged in
    }
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return;
    try {
      setIsLoading(true);
      const CitySnapshot = await getDoc(doc(db, "travels", id));
      if (CitySnapshot.exists()) {
        setCurrentCity(CitySnapshot.data());
      }
    } catch {
      console.log("There was an error loading the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const cityRef = doc(collection(db, "travels"));

      // Add the document ID to the newCity object
      newCity.id = cityRef.id;

      // Save the newCity document to Firestore
      await setDoc(cityRef, newCity);

      setCurrentCity(newCity);
      setCities((prevCities) => [...prevCities, newCity]);
    } catch {
      console.log("There was an error creating the city...");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      await deleteDoc(doc(db, "travels", id));
      setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    } catch {
      console.log("There was an error deleting the city...");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCities,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
