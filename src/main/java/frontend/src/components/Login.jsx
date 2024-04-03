import React, { useState } from "react";
import styles from "../styles/components/Login.module.css";

const Login = () => {
  return (
    <div className={styles.align}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <span className={styles.title}>LOGIN</span>
          <div className={styles.input}>
            <input placeholder="아이디"></input>
            <input type="password" placeholder="비밀번호"></input>
          </div>
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
