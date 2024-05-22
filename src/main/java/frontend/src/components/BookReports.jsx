import styles from "../styles/components/BookReports.module.css";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const BookReports = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isFocusedPlotSummary, setIsFocusedPlotSummary] = useState(false);
  const [isFocusedImpression, setIsFocusedImpression] = useState(false);
  const [isFocusedMemorable, setIsFocusedMemorable] = useState(false);
  const [plotSummaryInput, setPlotSummaryInput] = useState("");
  const [impressionInput, setImpressionInput] = useState("");
  const [memorableQuoteInput, setMemorableQuoteInput] = useState("");
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`).then((res) => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
    });
  }, []);

  const Submit = () => {
    const report = {
      id: Date.now().toString(),
      bookId: id,
      Writer: "사용자", 
      likes: 0,
      description: plotSummaryInput,
      Reviews: impressionInput,
      Paragraph: memorableQuoteInput
    };

    axios.post(`http://localhost:8000/BookReports`, report)
    navigate(`/read/${id}`)
  }

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
                style={{ color: isFocusedPlotSummary ? "#5467f5" : "" }}
              >
                줄거리 요약
              </div>
              <textarea
                className={styles.pTextarea}
                onChange={(e) => setPlotSummaryInput(e.target.value)}
                onFocus={() => setIsFocusedPlotSummary(true)}
                onBlur={() => setIsFocusedPlotSummary(false)}
              ></textarea>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedImpression ? "#5467f5" : "" }}
              >
                느낀 점 및 평가
              </div>
              <textarea
                className={styles.pTextarea}
                onChange={(e) => setImpressionInput(e.target.value)}
                onFocus={() => setIsFocusedImpression(true)}
                onBlur={() => setIsFocusedImpression(false)}
              ></textarea>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedMemorable ? "#5467f5" : "" }}
              >
                기억에 남는 구절
              </div>
              <textarea
                className={styles.pTextarea}
                onChange={(e) => setMemorableQuoteInput(e.target.value)}
                onFocus={() => setIsFocusedMemorable(true)}
                onBlur={() => setIsFocusedMemorable(false)}
              ></textarea>
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <button className={styles.Button}>저장</button>
            <button className={styles.Button2} onClick={() => {Submit()}}>제출</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookReports;
