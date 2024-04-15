import styles from "../styles/components/BookReports.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const BookReports = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [borderColor, setBorderColor] = useState('black');
  const [isFocusedPlotSummary, setIsFocusedPlotSummary] = useState(false);
  const [isFocusedImpression, setIsFocusedImpression] = useState(false);
  const [isFocusedMemorable, setIsFocusedMemorable] = useState(false);
  const [plotSummary, setPlotSummary] = useState("");
  const [impression, setImpression] = useState("");
  const [memorableQuote, setMemorableQuote] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`)
    .then(res => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
    })
  },[]);

  const handleSave = () => {
    axios.post(`http://localhost:8081/save`, {
      title,
      author,
      plotSummary,
      impression,
      memorableQuote
    })
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:8081/create`, {
      title,
      author,
      plotSummary,
      impression,
      memorableQuote
    })
    .then(res => {
      console.log("Submitted successfully:", res.data);
    })
    .catch(err => {
      console.error("Submission failed:", err);
    });
  };

  return(
    <>
      <div className={styles.Container}>
        <div className={styles.titleContainer}>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.author}>저자: {author}</div>
          </div>
          <div className={styles.img}></div>
        </div>
        <div className={styles.PlotSummaryContiner}>
          <div className={styles.PlotSummary} style={{color: isFocusedPlotSummary ? '#5667f5' : 'black'}}>줄거리 요약</div>
          <textarea
            className={styles.pTextare}
            onFocus={() => setIsFocusedPlotSummary(true)}
            onBlur={() => setIsFocusedPlotSummary(false)}
            onChange={(e) => setPlotSummary(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.PlotSummaryContiner1}>
          <div className={styles.PlotSummary} style={{color: isFocusedImpression ? '#5667f5' : 'black'}}>느낀 점 및 평가</div>
          <textarea
            className={styles.pTextare}
            onFocus={() => setIsFocusedImpression(true)}
            onBlur={() => setIsFocusedImpression(false)}
            onChange={(e) => setImpression(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.PlotSummaryContiner2}>
          <div className={styles.PlotSummary} style={{color: isFocusedMemorable ? '#5667f5' : 'black'}}>기억에 남는 구절</div>
          <textarea
            className={styles.pTextare}
            onFocus={() => setIsFocusedMemorable(true)}
            onBlur={() => setIsFocusedMemorable(false)}
            onChange={(e) => setMemorableQuote(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.ButtonContainer}>
          <button className={styles.Button} onClick={handleSave}>저장</button>
          <button className={styles.Button2} onClick={handleSubmit}>제출</button>
        </div>
      </div>
    </>
  )
}

export default BookReports;
