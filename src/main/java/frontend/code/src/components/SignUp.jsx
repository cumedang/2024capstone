import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import styles from "../styles/components/SignUp.module.css";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

const SignUp = ({ onClose }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernm, setUsernm] = useState("");
  const [mail, setMail] = useState("");
  const [view, setView] = useState(false);
  const [code, setCode] = useState("");

  const [idValid, setIdValid] = useState({
    lengthValid: false,
    conditionValid: false,
  });
  const [passwordLength, setPasswordLength] = useState(0);
  const [passwordCriteria, setPasswordCriteria] = useState({
    hasNumbers: false,
    hasSymbols: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [allValid, setAllValid] = useState(false);

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleIdChange = (e) => {
    const { value } = e.target;
    setId(value);
    setIdValid({
      lengthValid: value.length >= 6 && value.length <= 12,
      conditionValid: /^[A-Za-z0-9]+$/.test(value),
    });
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordLength(value.length >= 8 && value.length <= 64);
    setPasswordCriteria({
      hasNumbers: /\d/.test(value),
      hasSymbols: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
    setPasswordMatch(confirmPassword === value);
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);
    setPasswordMatch(value === password);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setUsernm(value);
  };

  const checkMail = (email) => {
    if (!emailRegex.test(email)) {
      alert("이메일 입력이 유효하지 않습니다.");
    } else {
      axios
        .post(`http://3.39.223.205/mailsend`, { email })
        .then(() => {
          alert("인증메일이 발송되었습니다. 이메일을 확인해주세요.");
          setView(true)
        })
        .catch((err) => {
          console.error("인증메일 발송에 실패했습니다.", err);
          alert("인증메일 발송에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  const isIdValid = idValid.lengthValid && idValid.conditionValid;
  const isPasswordValid =
    passwordLength &&
    (passwordCriteria.hasNumbers || passwordCriteria.hasSymbols);

  useEffect(() => {
    const isValid =
      isIdValid && passwordLength && isPasswordValid && passwordMatch;
    setAllValid(isValid);
  }, [isIdValid, passwordLength, isPasswordValid, passwordMatch]);

  const compltBtn = () => {
    axios
      .post(`http://3.39.223.205/sign`, {
        name: usernm,
        id: id,
        password: password,
        email: mail,
      })
      .then((response) => {
        if (response.data.success) {
          alert("회원가입이 완료되었습니다.");
          window.location.reload();
        } else {
          alert("아이디 또는 이름이 중복되었습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.log("회원가입 실패.", err);
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      });
  };

  const handleClose = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const mailsendCheck = (code) => {
    const mail1 = {
      email: mail,
      authNum: code
    }
    axios.post(`http://3.39.223.205/mailcheck`, mail1)
    .then((res) => {
      alert("인증 완료");
    })
  }

  return (
    <div className={styles.align} onClick={handleClose}>
      <div className={styles.container} onClick={handleModalClick}>
        <div className={styles.scrollBox}>
          <div className={styles.inner}>
            <span className={styles.title}>SIGN UP</span>
            <div className={styles.input}>
              <input
                placeholder="이름"
                value={usernm}
                onChange={handleNameChange}
              />
              <input
                placeholder="아이디"
                value={id}
                onChange={handleIdChange}
              />
              <div className={styles.password}>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
              </div>
              <div className={styles.verifyEmail}>
                <input
                  placeholder="이메일"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <button onClick={() => checkMail(mail)} disabled={!mail}>
                  인증메일 발송
                </button>
              </div>
              {view && (
                  <div className={styles.verifyEmail}>
                  <input
                    placeholder="인증코드"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <button onClick={() => mailsendCheck(code)}>
                    인증코드 확인
                  </button>
                </div>
              )}   
            </div>
            <div className={styles.vaildCheckContainer}>
              <div className={styles.validCheck}>
                {isIdValid ? (
                  <IoIosCheckmarkCircle className={styles.activeIcon} />
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
                <span>6-12자의 영문, 숫자만 입력 ( 아이디 )</span>
              </div>
              <div className={styles.validCheck}>
                {passwordLength ? (
                  <IoIosCheckmarkCircle className={styles.activeIcon} />
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
                <span>8~64자 입력 ( 비밀번호 )</span>
              </div>
              <div className={styles.validCheck}>
                {isPasswordValid ? (
                  <IoIosCheckmarkCircle className={styles.activeIcon} />
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
                <span>
                  영어, 숫자, 특수문자 중 2가지 이상 조합 ( 비밀번호 )
                </span>
              </div>
              <div className={styles.validCheck}>
                {passwordMatch ? (
                  <IoIosCheckmarkCircle className={styles.activeIcon} />
                ) : (
                  <IoIosCheckmarkCircleOutline />
                )}
                <span>비밀번호 일치</span>
              </div>
            </div>
            <button
              className={styles.signUpBtn}
              onClick={compltBtn}
              disabled={!allValid}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
