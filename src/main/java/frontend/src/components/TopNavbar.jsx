import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegBell } from "react-icons/fa";
import Login from "./Login";
import SignUp from "./SignUp";
import Logo from "../img/logo.png";
import Profile from "../img/images.png";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/components/TopNavbar.module.css";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";
import axios from "axios";

const TopNavbar = () => {
  const [modalType, setModalType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState({ point: 0 });
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
    if (window.confirm("로그아웃 하시겠습니까?")) {
      contextHandleLogout();
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const openProfileModal = () => {
    setShowDropdown(false);
    setModalType("profile");
  };

  useEffect(() => {
    const token = getCookie("Authorization");
    if (!token) {
      console.log("로그인이 필요합니다.");
      return;
    }
    axios.get(`http://3.39.223.205/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setProfile(res.data)
    })
    .catch((error) => {
      console.error("Error fetching profile:", error);
    });
  }, []);

  const ProfileModal = ({ closeModal }) => {
    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent}>
          <h2>내 정보</h2>
          <p>이름: {profile.name}</p>
          <p>아이디: {profile.id}</p>
          <p>이메일: {profile.email}</p>
          <p>등급: {profile.grade}</p>
          <button onClick={closeModal}>닫기</button>
        </div>
      </div>
    );
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
      {modalType === "profile" && <ProfileModal closeModal={closeModal} />}
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
                    <button onClick={openProfileModal}>내 정보</button>
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
