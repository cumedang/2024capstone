import React from "react";
import styles from "../../styles/components/session/Session2.module.css";

const Session2 = () => {
  return (
    <div className={styles.center}>
      <div className={styles.inner}>
        <div className={styles.titleSection}>
          <span className={styles.title}>
            다른 사용자가 작성한 독후감 보러가기
          </span>
        </div>
        <div className={styles.boxSection}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  );
};

export default Session2;
