import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import Pagenav from "../components/Pagenav";
import Button from "../components/Button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

import { getAllUser } from "../services/user.js";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState();
  const navigate = useNavigate();
  provider.setCustomParameters({
    prompt: "select_account", // This will force the user to select an account
  });
  useEffect(() => {
    const getUser = async () => {
      const data = await getAllUser();
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUser();
  }, [setUsers]);

  const SignInWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const data = await signInWithPopup(auth, provider);
      const userEmail = data.user.email;

      const userId = users?.find((doc) => doc.email === userEmail)?.id || "";

      Cookies.set("User", userId);
      const array = data.user.displayName.split(" ");
      const name = array[0] + " " + array[1];
      Cookies.set("Photo", data.user.photoURL);
      Cookies.set("Email", userEmail);
      Cookies.set("Name", name);
      if (!userId) {
        toast.error("User not found! Make sure you are registered.");
        navigate("/signup");
      } else {
        toast.success("Successfully logged in!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userEmail = users.some((doc) => doc.email === email);
      const userPassword = users.some((doc) => doc.password === password);
      const userId = users.find((doc) => doc.email === email)?.id || "";

      Cookies.set("User", userId);
      if (userEmail && userPassword) {
        toast.success("Successfully logged in !");
        navigate("/");
      } else {
        toast.error("  Invalid Password or You haven't set a Password!");
      }
    } catch (error) {
      console.log("Error creating account");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <main className={styles.login}>
      <Pagenav />

      <form className={styles.form}>
        <button className={styles.button} onClick={SignInWithGoogle}>
          <img
            alt="..."
            className={styles.googleIcon}
            src="https://dashboard.technex.co.in/assets/img/google.svg"
            width={20}
            height={20}
          />
          Continue with Google
        </button>
        <div className={styles.divider}></div>
        <p className={styles.subtitle}>Or sign in with credentials</p>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleSignIn}>
            Login
          </Button>
        </div>
        <div className={styles.signupContainer}>
          Don’t have an account?
          <Link to="/signup" className={styles.signupText}>
            Sign up
          </Link>
        </div>
      </form>
    </main>
  );
}
