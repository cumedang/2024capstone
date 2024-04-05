import styles from "../styles/components/BookReports.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookReports = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`)
    .then(res => {
      setTitle(res.data.title);
      setAuthor(res.data.author);
    })
  },[])
  
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
          <div className={styles.PlotSummary}>줄거리 요약</div>
          <textarea className={styles.pTextare}></textarea>
        </div>
        <div className={styles.PlotSummaryContiner1}>
          <div className={styles.PlotSummary}>느낀 점 및 평가</div>
          <textarea className={styles.pTextare}></textarea>
        </div>
        <div className={styles.PlotSummaryContiner2}>
          <div className={styles.PlotSummary}>기억에 남는 구절</div>
          <textarea className={styles.pTextare}></textarea>
        </div>
        <div className={styles.ButtonContainer}>
          <button>저장</button>
          <button>제출</button>
        </div>
      </div>
    </>
  )
}

export default BookReports;