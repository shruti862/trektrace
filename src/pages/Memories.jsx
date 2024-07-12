import Pagenav from "../components/Pagenav";
import Spinner from "../components/Spinner";
import styles from "./Memories.module.css";
import { useCities } from "../Context/CitiesContext";

import PhotoCard from "../components/PhotoCard";
import PhotoModal from "../components/PhotoModal";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Memories() {
  const { cities, isLoading } = useCities();
  const [showModal, setShowModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [initialIndex, setInitialIndex] = useState(0);
  const navigate = useNavigate();
  const handlePhotoClick = (photos, index) => {
    setSelectedPhotos(photos);
    setInitialIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleNavigate = () => {
    navigate("/app");
    window.location.reload();
  };
  return (
    <main className={styles.container}>
      <Pagenav />
      <h1 className={styles.title}>Your Memories</h1>
      <div className={styles.divider}></div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.photoGrid}>
          {cities?.length > 0 ? (
            cities?.map((city, cityIndex) => (
              <PhotoCard
                key={cityIndex}
                city={city}
                onPhotoClick={handlePhotoClick}
              />
            ))
          ) : (
            <div className={styles.box}>
              <div className={styles.msg}>
                You haven&apos;t created any memories yet!! Start your travel
                journey now...
              </div>
              <div className={styles.button}>
                <Button onClick={handleNavigate} type="primary">
                  Start tracking now
                </Button>
              </div>
            </div>
          )}
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
