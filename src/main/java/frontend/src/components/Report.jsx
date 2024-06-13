import styles from "../styles/components/Report.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const BookReports = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isFocusedPlotSummary, setIsFocusedPlotSummary] = useState(false);
  const [isFocusedImpression, setIsFocusedImpression] = useState(false);
  const [isFocusedMemorable, setIsFocusedMemorable] = useState(false);
  const [plotSummaryInput, setPlotSummaryInput] = useState("");
  const [impressionInput, setImpressionInput] = useState("");
  const [memorableQuoteInput, setMemorableQuoteInput] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [bookId, setBookId] = useState("");
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/BookReports/${id}`).then((res) => {
      setPlotSummaryInput(res.data.description);
      setImpressionInput(res.data.Reviews);
      setMemorableQuoteInput(res.data.Paragraph);
      setBookId(res.data.bookId);
      setAuthor(res.data.Writer);
    });
  }, [id]);

  useEffect(() => {
    if (bookId) {
      axios.get(`http://localhost:8000/books/${bookId}`).then((res) => {
        setTitle(res.data.title);
      });
    }
  }, [bookId]);

  const submit = () => {
    navigate(-1);
  };

  const edit = () => {
    setIsEditable(true);
  };

  const complete = () => {
    axios.get(`http://localhost:8000/BookReports/${id}`).then((res) => {
      const existingData = res.data;
      const updatedData = {
        ...existingData,
        description: plotSummaryInput,
        Reviews: impressionInput,
        Paragraph: memorableQuoteInput
      };
      axios.put(`http://localhost:8000/BookReports/${id}`, updatedData);
    });
    window.location.reload();
  };

  useEffect(()=>{
    console.log(plotSummaryInput)
  },[plotSummaryInput])
  
  useEffect(()=>{
    console.log(memorableQuoteInput)
  },[memorableQuoteInput])

  useEffect(()=>{
    console.log(impressionInput)
  },[impressionInput])

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
              <textarea
                className={styles.pTextarea}
                disabled={!isEditable}
                onFocus={() => setIsFocusedPlotSummary(true)}
                onBlur={() => setIsFocusedPlotSummary(false)}
                value={plotSummaryInput}
                onChange={(e) => setPlotSummaryInput(e.target.value)}
              />
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedImpression ? "#5467f5" : "" }}
              >
                느낀 점 및 평가
              </div>
              <textarea
                disabled={!isEditable}
                className={styles.pTextarea}
                onFocus={() => setIsFocusedImpression(true)}
                onBlur={() => setIsFocusedImpression(false)}
                value={impressionInput}
                onChange={(e) => setImpressionInput(e.target.value)}
              />
            </div>
            <div className={styles.PlotSummaryContainer}>
              <div
                className={styles.PlotSummary}
                style={{ color: isFocusedMemorable ? "#5467f5" : "" }}
              >
                기억에 남는 구절
              </div>
              <textarea
                disabled={!isEditable}
                className={styles.pTextarea}
                onFocus={() => setIsFocusedMemorable(true)}
                onBlur={() => setIsFocusedMemorable(false)}
                value={memorableQuoteInput}
                onChange={(e) => setMemorableQuoteInput(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.ButtonContainer}>
            {isEditable ? (
              <button className={styles.Button2} onClick={complete}>완료</button>
            ) : (
              <>
                <button className={styles.Button2} onClick={edit}>수정</button>
                <button className={styles.Button2} onClick={submit}>돌아가기</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookReports;