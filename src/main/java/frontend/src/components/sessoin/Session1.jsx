import React from "react";
import styles from "../../styles/components/session/Session1.module.css";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Session1 = () => {
  return (
    <div className={styles.center}>
      <div className={styles.inner}>
        <span className={styles.subtitle}>독서 커뮤니티 사이트 READNET</span>
        <span className={styles.title}>WELCOME TO READNET!</span>
        <span className={styles.descript}>
          다양한 책을 읽고 독후감을 작성하며, 다른 독자들과 의견을 나눌 수
          있습니다. <br />
          함께 독서의 즐거움을 나누고 새로운 시각을 발견해 보세요.
        </span>
        <Link to="/search" className={styles.button}>
          <span>독후감 작성하기</span>
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
};

export default Session1;
