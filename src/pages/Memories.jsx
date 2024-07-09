import Pagenav from "../components/Pagenav";
import Spinner from "../components/Spinner";
import styles from "./Memories.module.css";
import { useCities } from "../Context/CitiesContext";
import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";
import { useState } from "react";
function Memories() {
  const { cities, isLoading } = useCities();
  const [showModal, setShowModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);

  const handlePhotoClick = (photos, index) => {
    setSelectedPhotos(photos);
    setInitialIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <main className={styles.container}>
      <Pagenav />
      <h1 className={styles.title}>Your Memories</h1>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.photoGrid}>
          {cities?.map((city, cityIndex) => (
            <PhotoCard
              key={cityIndex}
              city={city}
              onPhotoClick={handlePhotoClick}
            />
          ))}
        </div>
      )}
      {showModal && (
        <PhotoModal
          show={showModal}
          photos={selectedPhotos}
          initialIndex={initialIndex}
          handleClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default Memories;
