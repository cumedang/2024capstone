import styles from "../styles/components/Report.module.css";
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
  const [plotSummaryInput, setPlotSummaryInput] = useState([]);
  const [impressionInput, setImpressionInput] = useState([]);
  const [memorableQuoteInput, setMemorableQuoteInput] = useState([]);
  const [bookId, setBookId] = useState([]);
  const navigate = useNavigate();
  
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8081/bookreport/${id}`).then((res) => {
      setPlotSummaryInput(res.data.description)
      setImpressionInput(res.data.reviews)
      setMemorableQuoteInput(res.data.paragraph)
      setBookId(res.data.bookId)
      setAuthor(res.data.writer);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${bookId}`).then((res) => {
      console.log(res.data)
      setTitle(res.data.title);
    });
  }, [title]);

  const Submit = () => {
    navigate(-1);
  }

  const Submit2 = () => {
    axios.post(`http://localhost:8081/delete`, );
  }


  return (
    <>
      <div className={styles.Container}>
        <div className={styles.inner}>
          <div className={styles.titleContainer}>
            <div>
              <div className={styles.title}>{title}</div>
              <div className={styles.author}>글쓴이: {author}</div>
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
              <div
                className={styles.pTextarea}
                onFocus={() => setIsFocusedPlotSummary(true)}
                onBlur={() => setIsFocusedPlotSummary(false)}
              >{plotSummaryInput}</div>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedImpression ? "#5467f5" : "" }}
              >
                느낀 점 및 평가
              </div>
              <div
                className={styles.pTextarea}
                onFocus={() => setIsFocusedImpression(true)}
                onBlur={() => setIsFocusedImpression(false)}
              >{impressionInput}</div>
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedMemorable ? "#5467f5" : "" }}
              >
                기억에 남는 구절
              </div>
              <div
                className={styles.pTextarea}
                onFocus={() => setIsFocusedMemorable(true)}
                onBlur={() => setIsFocusedMemorable(false)}
              >{memorableQuoteInput}</div>
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            <button className={styles.Button2} onClick={() => {Submit2()}}>삭제</button>
            <button className={styles.Button2} onClick={() => {Submit()}}>돌아가기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookReports;