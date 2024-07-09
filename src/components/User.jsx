import styles from "./User.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCities } from "../Context/CitiesContext";
import { getUser } from "../services/user";
function User() {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const { setCities } = useCities();
  useEffect(() => {
    const userInfo = async () => {
      const id = Cookies.get("User");
      const user = await getUser(id);
      console.log(user);
      const photo = Cookies.get("Photo") || "/default.jpg";
      setPhoto(photo);
      const username =
        Cookies.get("Name")?.split(" ")[0] || user?.name.split(" ")[0];
      setName(username);
    };
    userInfo();
  }, []);

  const navigate = useNavigate();
  const handleLogOut = (e) => {
    e.preventDefault();
    toast.success("You are now logged out!");

    // List of cookies to clear
    const cookiesToClear = ["User", "Photo", "Name", "Email"];

    // Clear each cookie
    cookiesToClear.forEach((cookieName) => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    setCities([]);

    navigate("/");
  };

  return (
    <div className={styles.user}>
      <Link to="/album" className={styles.box}>
        <img src={photo} alt={name} />
        <span>Welcome, {name}</span>
      </Link>
      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default User;
