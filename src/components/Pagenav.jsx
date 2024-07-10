import { NavLink } from "react-router-dom";
import styles from "./Pagenav.module.css";
import Cookies from "js-cookie";
import Logo from "./Logo";
import Button from "./Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCities } from "../Context/CitiesContext";
function Pagenav() {
  const userId = Cookies.get("User");
  const { setCities } = useCities();
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
  const handleNavigate = () => {
    navigate("/album");
    window.location.reload();
  };
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          {userId ? (
            <div className={styles.box}>
              <Button type="secondary" onClick={handleNavigate}>
                Album
              </Button>
              <Button onClick={handleLogOut} type="primary">
                Logout
              </Button>
            </div>
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Pagenav;
