import React, { useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import styles from "../styles/components/Login.module.css";
import kakaoImg from "../img/kakao.png";
import naverImg from "../img/naver.png";

const Login = ({ onClose }) => {
  const [saveInfo, setSaveInfo] = useState(false);

  const toggleSaveInfo = () => {
    setSaveInfo(!saveInfo);
  };

  const handleClose = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.align} onClick={handleClose}>
      <div className={styles.container} onClick={handleModalClick}>
        <div className={styles.inner}>
          <span className={styles.title}>LOGIN</span>
          <div className={styles.input}>
            <input placeholder="아이디"></input>
            <input type="password" placeholder="비밀번호"></input>
          </div>
          <div className={styles.saveInfo} onClick={toggleSaveInfo}>
            {saveInfo ? (
              <IoIosCheckmarkCircle className={styles.activeIcon} />
            ) : (
              <IoIosCheckmarkCircleOutline />
            )}
            <span>로그인 상태 유지</span>
          </div>
          <button className={styles.loginBtn}>로그인</button>
          <div className={styles.util}>
            <span>회원가입</span>
            <div className={styles.find}>
              <span>아이디 찾기</span>
              <div>|</div>
              <span>비밀번호 찾기</span>
            </div>
          </div>
          <div className={styles.contour}>
            <div></div>
            <span>또는</span>
            <div></div>
          </div>
          <div className={styles.socialLogin}>
            <button className={styles.kakao}>
              <img src={kakaoImg} alt="카카오 로그인" />
              <span>카카오 계정으로 로그인</span>
            </button>
            <button className={styles.naver}>
              <img src={naverImg} />
              <span>네이버 계정으로 로그인</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
