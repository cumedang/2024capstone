import React, { useState, useEffect } from "react";
import styles from "../styles/components/TopNavbar.module.css";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [loginActive, setLoginActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    setIsLoggedIn(!!token);
  }, []);

  const navigatePage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <>
      {loginActive && (
        <Login
          onClose={() => setLoginActive(false)}
          onSignUp={() => {
            setSignUpActive(true);
            setLoginActive(false);
          }}
        />
      )}
      {signUpActive && <SignUp onClose={() => setSignUpActive(false)} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <span
              onClick={() => {
                navigatePage("");
              }}
            >
              READNET
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
            <span
              onClick={() => {
                navigatePage("chatrooms");
              }}
            >
              채팅방
            </span>
            <span
              onClick={() => {
                navigatePage("chatrooms");
              }}
              className={styles.PP}
            >
              포인트상점 
              <div className={styles.P}>P</div>
            </span>
          </div>
          {isLoggedIn ? (
            <div className={styles.profile}>아이콘</div>
          ) : (
            <div className={styles.util}>
              <button
                className={styles.signup}
                onClick={() => {
                  setSignUpActive(true);
                }}
              >
                회원가입
              </button>
              <button
                className={styles.login}
                onClick={() => {
                  setLoginActive(true);
                }}
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
