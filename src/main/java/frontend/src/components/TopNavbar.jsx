import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // useNavigate 추가
import { FaRegBell } from "react-icons/fa";
import Login from "./Login";
import SignUp from "./SignUp";
import Logo from "../img/logo.png";
import Profile from "../img/images.png";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/components/TopNavbar.module.css";

const TopNavbar = () => {
  const [modalType, setModalType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    isLogin,
    handleLoginSuccess,
    handleLogout: contextHandleLogout,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeModal = () => {
    setModalType(null);
  };

  const handleLogout = () => {
    contextHandleLogout();
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <>
      {modalType === "login" && (
        <Login
          onClose={closeModal}
          onSignUp={() => setModalType("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modalType === "signup" && <SignUp onClose={closeModal} />}
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <NavLink to="/">
              <img src={Logo} alt="readnet" title="readnet" />
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
          {isLogin ? (
            <div className={styles.userInfo}>
              <div className={styles.alarm}>
                <FaRegBell />
              </div>
              <div className={styles.profile} onClick={toggleDropdown}>
                <img src={Profile} alt="프로필" />
                {showDropdown && (
                  <div className={styles.dropdownMenu}>
                    <button>내 정보</button>
                    <button onClick={handleLogout}>로그아웃</button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={styles.util}>
              <button
                className={styles.signup}
                onClick={() => setModalType("signup")}
                disabled={isLogin}
              >
                회원가입
              </button>
              <button
                className={styles.login}
                onClick={() => setModalType("login")}
                disabled={isLogin}
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
