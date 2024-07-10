import styles from "../styles/components/Report.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

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
  const [description, setDescription] = useState("");
  const [bid, getBid] = useState("");
  const [userId, getUserId] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/profile`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      getUserId(res.data.name);
      console.log(res.data.name);
    })
  })

  useEffect(() => {
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/bookreport/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      getBid(res.data.no);
      console.log(res.data.no);
      setPlotSummaryInput(res.data.description);
      setImpressionInput(res.data.reviews);
      setMemorableQuoteInput(res.data.paragraph);
      setBookId(res.data.bookId);
      setAuthor(res.data.writer);
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
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/bookreport/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      const existingData = res.data;
      const updatedData = {
        ...existingData,
        description: plotSummaryInput,
        reviews: impressionInput,
        paragraph: memorableQuoteInput
      };
      console.log(updatedData);
      axios.post(`http://3.39.223.205/bookreport/update`, updatedData ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    });
    navigate(-1);
  };

  const deleteList = () => {
    if(window.confirm("삭제 하시겠습니까?")){
      Delete();
    }
  }

  const Delete = () => {
    const Data = {
      id: bid,
      userId: userId
    };
    const token = getCookie("Authorization");
    axios.post(`http://3.39.223.205/bookreport/delete`, Data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  ).then((res) => {
    navigate(-1);
  })
  }
  
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
              <>
                <button className={styles.Button2} onClick={deleteList}>삭제</button>
                <button className={styles.Button2} onClick={complete}>완료</button>
              </>
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