import { useState } from "react";
import Modal from "./Modal";
import styles from "./UploadPhotos.module.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// eslint-disable-next-line react/prop-types
const UploadPhotos = ({ show, handleClose, setUploadedPhotos }) => {
  const [photos, setPhotos] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };
  const handleDeletePhoto = (index) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const photoUrls = [];
    for (const photo of photos) {
      const storageRef = ref(storage, `photos/${photo.name}`);
      await uploadBytes(storageRef, photo);
      const url = await getDownloadURL(storageRef);
      photoUrls.push(url);
    }
    setUploadedPhotos(photoUrls);
    handleClose();
  };
  return (
    <div className={styles.container}>
      <Modal show={show} handleClose={handleClose}>
        <div className={styles.title}>
          <img src="/icon.png" className={styles.icon} />
          <h2>UPLOAD PHOTOS</h2>
        </div>

        <input type="file" multiple onChange={handleFileChange} />

        <div className={styles.preview}>
          {photos.map((photo, index) => (
            <div key={index} className={styles.thumbnailWrapper}>
              <img
                src={URL.createObjectURL(photo)}
                alt={`Photo ${index + 1}`}
                className={styles.thumbnail}
              />
              <button
                className={styles.deleteButton}
                onClick={() => handleDeletePhoto(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <button className={styles.secondaryButton} onClick={handleUpload}>
          Upload
        </button>
      </Modal>
    </div>
  );
};

export default UploadPhotos;
