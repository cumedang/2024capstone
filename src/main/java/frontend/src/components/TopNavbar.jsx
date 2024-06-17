import React, { useState } from "react";
import styles from "../styles/components/TopNavbar.module.css";
import { NavLink } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import Login from "./Login";
import SignUp from "./SignUp";
import Logo from "../img/logo.png";

const TopNavbar = () => {
  const [loginActive, setLoginActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const handleLoginSuccess = () => {
    setIsLogin(true);
    setLoginActive(false);
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
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {signUpActive && <SignUp onClose={() => setSignUpActive(false)} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img src={Logo} alt="readnet" title="readnet"></img>
            </NavLink>
          </div>
          <div className={styles.menu}>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              도서목록
            </NavLink>
            <NavLink
              to="/chatrooms"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              채팅방
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              포인트상점
            </NavLink>
          </div>
          {!isLogin && (
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
          {isLogin && (
            <div className={styles.userInfo}>
              <div className={styles.alarm}>
                <FaRegBell />
              </div>
              <div className={styles.profile}></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
