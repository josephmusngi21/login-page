// Register.js
import React, { useState } from "react";
import styles from "../styles/Register.module.css";
import axios from "axios";

import { isPasswordValid } from "./utils/PasswordValidation";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      const encoded = encodeURIComponent(email);
      event.preventDefault();
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      //Check if password is secure
      if (!isPasswordValid(password)) {
        alert(
          "Password must contain at least one uppercase letter and one other character!"
        );
        return;
      }
      // Check if email already exists
      const response = await axios.get(
        `http://localhost:4000/checkEmail/${encoded}`
      );
      console.log("Email check response:", response);
      if (response.data.exists) {
        alert("Email already exists!");
        return;
      }
      // Send a GET request to the server
      await axios
        .get(`http://localhost:4000/addpost/${encoded}/${password}}`)
        .then((response) => console.log(response));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <input
            autoComplete="off"
            type="text"
            name="email"
            className={styles.input}
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            className={styles.input}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            type="password"
            name="confirmPassword"
            className={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Sign Up" className={styles.button} />
      </form>
    </div>
  );
}

export default Register;
