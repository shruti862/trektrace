import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import Pagenav from "../components/Pagenav";
import Button from "../components/Button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase.js";

import { getAllUser, addUser } from "../services/user.js";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      console.log(data);
      const array = data.user.displayName.split(" ");
      const name = array[0];
      const userEmail = data.user.email;

      Cookies.set("Photo", data.user.photoURL);
      Cookies.set("Email", userEmail);
      Cookies.set("Name", name);

      if (users.find((doc) => doc.email == data.user.email) == undefined) {
        const userData = await addUser({ name: name, email: userEmail });
        const UserId = userData.id;
        Cookies.set("User", UserId);
        navigate("/");
        toast.success("Successfully signed up!");
      } else {
        toast.error(
          " You already have an account ! Please login into your account."
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      toast.error("All fields are mandatory!");
      return;
    }

    const newUser = {
      name,
      password,
      email,
    };
    console.log(newUser);

    try {
      const data = await addUser(newUser);
      console.log("userId:", data.id);
      const UserId = data.id;
      Cookies.set("User", UserId);
    } catch (err) {
      console.log(err.message);
    }

    setName("");

    setEmail("");
    setPassword("");
    navigate("/");
    toast.success("  You are successfully registered! ");
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
        <p className={styles.subtitle}>Or sign up with credentials</p>
        <div className={styles.row}>
          <label htmlFor="email">Full Name</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
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
          <Button type="primary" onClick={handleSignUp}>
            Signup
          </Button>
        </div>
        <div className={styles.loginContainer}>
          Already have an account?
          <Link to="/login" className={styles.loginText}>
            Log in
          </Link>
        </div>
      </form>
    </main>
  );
}
