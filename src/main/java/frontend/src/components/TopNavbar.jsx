import React, { useState, useEffect } from "react";
import styles from "../styles/components/TopNavbar.module.css";
import { useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa6";
import Login from "./Login";
import SignUp from "./SignUp";

const TopNavbar = () => {
  const navigate = useNavigate();
  const [loginActive, setLoginActive] = useState(false);
  const [signUpActive, setSignUpActive] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const navigatePage = (page) => {
    navigate(`/${page}`);
  };

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
          </div>
          {!isLogin && ( // 로그인 상태가 아닐 때만 버튼을 표시
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
