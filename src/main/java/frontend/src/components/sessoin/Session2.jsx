import React, { useState, useEffect } from "react";
import styles from "../../styles/components/session/Session2.module.css";
import { AiOutlineLike } from "react-icons/ai";

const Session2 = () => {
  const [bookReports, setBookReports] = useState([]);
  const [randomReports, setRandomReports] = useState([]);

  useEffect(() => {
    const fetchBookReports = async () => {
      try {
        const response = await fetch("http://localhost:8000/BookReports");
        const data = await response.json();
        setBookReports(data);

        // 무작위로 선택된 보고서 설정
        const getRandomReports = (reports, num) => {
          const shuffled = [...reports].sort(() => 0.5 - Math.random());
          return shuffled.slice(0, num);
        };
        
        setRandomReports(getRandomReports(data, 3));
      } catch (error) {
        console.error("Error fetching book reports:", error);
      }
    };

    fetchBookReports();
  }, []);

  useEffect(() => {
    console.log(randomReports);
  }, [randomReports]);

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
              <div className={styles.boxTitle}><AiOutlineLike />{report.likes}개</div>
              <div className={styles.contents}>
                {report.description.length > 34 ? `${report.description.substring(0, 34)}...` : report.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Session2;
