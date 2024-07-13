import { useState } from "react";
import Modal from "./Modal";
import styles from "./UploadPhotos.module.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
// eslint-disable-next-line react/prop-types
const UploadPhotos = ({ show, handleClose, setUploadedPhotos }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
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
    try {
      setLoading(true);
      const uploadPromises = photos.map(async (photo) => {
        const storageRef = ref(storage, `photos/${photo.name}`);
        await uploadBytes(storageRef, photo);
        const url = await getDownloadURL(storageRef);
        return url;
      });

      const photoUrls = await Promise.all(uploadPromises);
      setUploadedPhotos(photoUrls);
      toast.success("Successfully Uploaded!");
      handleClose();
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
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
          {loading ? "Uploading..." : "Upload"}
        </button>
      </Modal>
    </div>
  );
};

export default UploadPhotos;
