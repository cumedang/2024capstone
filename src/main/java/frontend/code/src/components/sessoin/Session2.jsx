import React, { useState, useEffect } from "react";
import styles from "../../styles/components/session/Session2.module.css";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../../utils/cookie";

const Session2 = () => {
  const [bookReports, setBookReports] = useState([]);
  const [randomReports, setRandomReports] = useState([]);

  useEffect(() => {
    const fetchBookReports = async () => {
      const token = getCookie("Authorization");
      if (!token) {
        console.log("로그인이 필요합니다.");
        return;
      }
      try {
        const response = await axios.get("http://3.39.223.205/reportlist", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data.content;
        setBookReports(data);

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
          <span className={styles.title}>다른 사용자가 작성한 독후감 보기</span>
        </div>
        <div className={styles.boxSection}>
          {randomReports.map((report, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.userName}>{report.writer}</div>
              <div className={styles.boxTitle}>
                <AiOutlineLike />
                {report.likes}개
              </div>
              <div className={styles.contents}>
                {report.description.length > 34
                  ? `${report.description.substring(0, 34)}...`
                  : report.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Session2;
