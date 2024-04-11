import React, { useEffect, useState } from "react";
import {
  IoIosCheckmarkCircle,
  IoIosCheckmarkCircleOutline,
} from "react-icons/io";
import styles from "../styles/components/SignUp.module.css";

const SignUp = ({ onClose }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const isIdValid = idValid.lengthValid && idValid.conditionValid;
  const isPasswordValid =
    passwordLength &&
    (passwordCriteria.hasNumbers || passwordCriteria.hasSymbols);

  useEffect(() => {
    const isValid =
      isIdValid && passwordLength && isPasswordValid && passwordMatch;
    setAllValid(isValid);
  }, [isIdValid, passwordLength, isPasswordValid, passwordMatch]);

  const handleClose = () => {
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.align} onClick={handleClose}>
      <div className={styles.container} onClick={handleModalClick}>
        <div className={styles.scrollBox}>
          <div className={styles.inner}>
            <span className={styles.title}>SIGN UP</span>
            <div className={styles.input}>
              <input placeholder="이름"></input>
              <input
                placeholder="아이디"
                value={id}
                onChange={handleIdChange}
              ></input>
              <div className={styles.password}>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={handlePasswordChange}
                  ></input>
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  ></input>
                </div>
              </div>
              <input placeholder="이메일 인증"></input>
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
            <button className={styles.signUpBtn} disabled={!allValid}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
