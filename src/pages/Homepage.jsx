import styles from "./Homepage.module.css";
import Pagenav from "../components/Pagenav";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "../components/Button";
import toast from "react-hot-toast";
export default function Homepage() {
  const userId = Cookies.get("User");
  const navigate = useNavigate();
  const handleClick = () => {
    toast("You need to login first before tracking your journey!", {
      icon: "👉",
    });
  };
  const handleNavigate = () => {
    navigate("/app");
    window.location.reload();
  };
  return (
    <main className={styles.homepage}>
      <Pagenav />
      <section>
        <h1>
          You travel the world.
          <br />
          TrekTrace keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </h2>
        {userId ? (
          <Button onClick={handleNavigate} type="primary">
            Start tracking now
          </Button>
        ) : (
          <Button onClick={handleClick} type="primary">
            Start tracking now
          </Button>
        )}
      </section>
    </main>
  );
}
