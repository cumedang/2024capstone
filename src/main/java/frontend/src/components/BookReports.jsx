import styles from "../styles/components/BookReports.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const BookReports = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [borderColor, setBorderColor] = useState("black");
  const [isFocusedPlotSummary, setIsFocusedPlotSummary] = useState(false);
  const [isFocusedImpression, setIsFocusedImpression] = useState(false);
  const [isFocusedMemorable, setIsFocusedMemorable] = useState(false);
  const [plotSummary, setPlotSummary] = useState("");
  const [impression, setImpression] = useState("");
  const [memorableQuote, setMemorableQuote] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
    });
  }, []);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.inner}>
          <div className={styles.titleContainer}>
            <div>
              <div className={styles.title}>{title}</div>
              <div className={styles.author}>저자: {author}</div>
            </div>
            <div className={styles.img}></div>
          </div>
          <div className={styles.alignContainers}>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedPlotSummary ? "blue" : "black" }}
              >
                줄거리 요약
              </div>
              <textarea
                className={styles.pTextare}
                onFocus={() => setIsFocusedPlotSummary(true)}
                onBlur={() => setIsFocusedPlotSummary(false)}
              ></textarea>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedImpression ? "blue" : "black" }}
              >
                느낀 점 및 평가
              </div>
              <textarea
                className={styles.pTextare}
                onFocus={() => setIsFocusedImpression(true)}
                onBlur={() => setIsFocusedImpression(false)}
              ></textarea>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedMemorable ? "blue" : "black" }}
              >
                기억에 남는 구절
              </div>
              <textarea
                className={styles.pTextare}
                onFocus={() => setIsFocusedMemorable(true)}
                onBlur={() => setIsFocusedMemorable(false)}
              ></textarea>
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <button className={styles.Button}>저장</button>
            <button className={styles.Button2}>제출</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookReports;
