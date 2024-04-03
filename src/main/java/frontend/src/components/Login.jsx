import React from "react";
import styles from "../styles/components/Login.module.css";

const Login = () => {
  return (
    <div className={styles.align}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}></div>
          <div className={styles.input}></div>
          <div className={styles.saveInfo}></div>
          <div className={styles.loginBtn}></div>
          <div className={styles.util}></div>
          <div className={styles.contour}></div>
          <div className={styles.socialLogin}></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
