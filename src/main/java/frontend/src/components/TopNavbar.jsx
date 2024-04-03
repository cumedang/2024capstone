import React, { useState } from "react";
import styles from "../styles/components/TopNavbar.module.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [loginActive, setLoginActive] = useState(false);

  const navigatePage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <>
      {loginActive && <Login />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <span
              onClick={() => {
                navigatePage("");
              }}
            >
              LOGO
            </span>
          </div>
          <div className={styles.menu}>
            <span
              onClick={() => {
                navigatePage("search");
              }}
            >
              도서목록
            </span>
            <span>채팅방</span>
          </div>
          <div className={styles.util}>
            <button className={styles.signup}>회원가입</button>
            <button
              className={styles.login}
              onClick={() => {
                setLoginActive(true);
              }}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
