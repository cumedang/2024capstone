import React, { useState, useEffect } from "react";
import styles from "../../styles/components/session/Session2.module.css";

const Session2 = () => {
  const [bookReports, setBookReports] = useState([]);

  useEffect(() => {
    const fetchBookReports = async () => {
      try {
        const response = await fetch("http://localhost:8000/BookReports");
        const data = await response.json();
        setBookReports(data);
      } catch (error) {
        console.error("Error fetching book reports:", error);
      }
    };

    fetchBookReports();
  }, []);

  const getRandomReports = (reports, num) => {
    const shuffled = [...reports].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  };

  const randomReports = getRandomReports(bookReports, 3);

  return (
    <div className={styles.center}>
      <div className={styles.inner}>
        <div className={styles.titleSection}>
          <span className={styles.title}>
            다른 사용자가 작성한 독후감 보러가기
          </span>
        </div>
        <div className={styles.boxSection}>
          {randomReports.map((report, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.userName}>{report.Writer}</div>
              <div className={styles.boxTitle}>{report.title}</div>
              <div className={styles.contents}>{report.contents}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Session2;
