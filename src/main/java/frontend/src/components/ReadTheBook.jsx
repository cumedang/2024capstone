import styles from "../styles/components/ReadTheBook.module.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChatFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";

const ReadTheBook = () => {
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [report, setReport] = useState([]);
  const [num, setNum] = useState([]);
  const navigate = useNavigate();
  const categoryColors = {
    총류: "#ff0000",
    철학: "#ff9100",
    종교: "##fff202",
    사회과학: "#00f7ff",
    자연과학: "#0f00de",
    기술과학: "#8400ff",
    예술: "#db7373",
    언어: "#df9973",
    문학: "#53792d",
    역사: "#8cd139",
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/books/${id}`)
        .then((res) => {
          setResults(res.data);
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
  },[])

  useEffect(() => {
    axios.get(`http://localhost:8000/BookReports`)
        .then((res) => {
          setNum(res.data.length);
          setReport(res.data);
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
  },[])

  const BookReport = (id) => {
    navigate(`/search/${id}/BookReports`);
  }

  return(
    <>
      <div className={styles.ListContainer}>
        <div className={styles.ItemContainer}>
          <div className={styles.image}></div>
          <div className={styles.tagContainer}>
            <div className={styles.tag}
              style={{ backgroundColor: categoryColors[results.category] }}>
              {results.category}
            </div>
            <div className={styles.title}>{results.title}</div>
            <div className={styles.DetailsContainer}>
              <div className={styles.DetailsContainer1}>
                <div className={styles.Details}>저자</div>
                <div className={styles.Details}>출판사</div>
                <div className={styles.Details}>좋아요</div>
                <div className={styles.Details}>독후감</div>
                <div className={styles.Details}>줄거리</div>
              </div>
              <div>
                <div className={styles.Details1}>{results.author}</div>
                <div className={styles.Details1}>{results.Publishers}</div>
                <div className={styles.Details1}>{results.likes}</div>
                <div className={styles.Details1}>{results.BookReports}</div>
                <div className={styles.Details1}>{results && results.description && results.description.length > 160  ? results.description.slice(0, 160) + "..."  : (results && results.description) || "안떠용"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.chatButton}>
          <div className={styles.buttonText}>채팅방 가입하기</div>
          <div className={styles.buttonicon}><BsChatFill /></div>
        </div>
        <div className={styles.ReportContainer}>
          <div className={styles.Report}>
            <div className={styles.Num}>독후감 {num}개</div>
            <div className={styles.WriteContainer}><div className={styles.Write} onClick={() => {BookReport(id)}}>독후감 작성하기 <div className={styles.ReportIcon}><BiSolidPencil /></div></div></div>
          </div>
          <div className={styles.ReviewContainer}>
                {report.map(report => (
                  <div className={styles.WriterContainer}>
                    <div className={styles.flexContainer}>
                      <div key={report.id}>{report.Writer}</div>
                      <div style={{ display: 'flex'}}>
                        <div><AiOutlineLike /></div>
                        <div key={report.id}>{report.likes}</div>
                      </div>
                    </div>
                    <div key={report.id}>{report.description}</div>
                  </div>
                ))}
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReadTheBook;