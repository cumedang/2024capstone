import React from "react";
import styles from "../styles/components/TopNavbar.module.css";

const TopNavbar = () => {
  return (
    <div className={styles.container}>
      <div>LOGO</div>
      <div>도서목록</div>
      <div>채팅방</div>
      <div>로그인</div>
      <div>회원가입</div>
    </div>
  );
};

export default TopNavbar;
