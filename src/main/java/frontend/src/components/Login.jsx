import React, { useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import styles from "../styles/components/Login.module.css";
import kakaoImg from "../img/kakao.png";
import naverImg from "../img/naver.png";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

const Login = ({ onClose, onSignUp, onLoginSuccess }) => {
  const [saveInfo, setSaveInfo] = useState(false);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!id || !pw) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    axios
      .post(`http://3.39.223.205/login`, {
        id: id,
        password: pw,
      })
      .then((res) => {
        if (res.data.success) {
          console.log("로그인 성공");
          alert("로그인 성공");
          onLoginSuccess();
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

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
        <form className={styles.inner}>
          <span className={styles.title}>LOGIN</span>
          <div className={styles.input}>
            <input
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
            <input
              type="password"
              placeholder="비밀번호"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            ></input>
          </div>
          <div className={styles.saveInfo} onClick={toggleSaveInfo}>
            {saveInfo ? (
              <IoIosCheckmarkCircle className={styles.activeIcon} />
            ) : (
              <IoIosCheckmarkCircleOutline />
            )}
            <span>로그인 상태 유지</span>
          </div>
          <button className={styles.loginBtn} onClick={submit}>
            로그인
          </button>
          <div className={styles.util}>
            <span onClick={onSignUp}>회원가입</span>
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
              <img src={naverImg} alt="네이버 로그인" />
              <span>네이버 계정으로 로그인</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
