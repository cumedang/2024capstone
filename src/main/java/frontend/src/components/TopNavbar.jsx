import React from "react";
import styles from "../styles/components/TopNavbar.module.css";
import { useNavigate } from "react-router-dom";

const TopNavbar = () => {
  const navigate = useNavigate()
  const handleClickList = () => {
    navigate("/search")
  }

  const handleClickLogo = () => {
    navigate("/")
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span onClick={() => {handleClickLogo()}}>LOGO</span>
        </div>
        <div className={styles.menu}>
          <span onClick={() => {handleClickList()}}>도서목록</span>
          <span>채팅방</span>
        </div>
        <div className={styles.util}>
          <button className={styles.signup}>회원가입</button>
          <button className={styles.login}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;