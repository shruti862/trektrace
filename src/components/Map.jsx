import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import Geolocation from "../hooks/Geolocation";
import Button from "./Button";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../Context/CitiesContext";
import useUrlPosition from "../hooks/useUrlPosition";
function Map() {
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {
    isLoading: geoLocationIsLoading,
    position: geolocationPosition,
    getPosition,
  } = Geolocation();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {geoLocationIsLoading ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => {
          const { latitude, longitude } = city.position || {};
          if (typeof latitude === "number" && typeof longitude === "number") {
            return (
              <Marker position={[latitude, longitude]} key={city.id}>
                <Popup>
                  <span>{city.emoji}</span> <span>{city.cityName}</span>
                </Popup>
              </Marker>
            );
          } else {
            console.warn(
              `Invalid position for city ${city.cityName}:`,
              city.position
            );
            return null;
          }
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng?.lat}&lng=${e.latlng?.lng}`);
    },
  });
}
export default Map;
