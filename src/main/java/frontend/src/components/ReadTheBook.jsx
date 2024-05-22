import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChatFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import Pagination from "react-js-pagination";
import styles from "../styles/components/ReadTheBook.module.css";

const ReadTheBook = () => {
  const clickBoxRef = useRef(null);
  const [swowReport, setSwowReport] = useState(true);
  const [swowReport1, setSwowReport1] = useState(false);
  const { id } = useParams();
  const [results, setResults] = useState([]);
  const [report, setReport] = useState([]);
  const [num, setNum] = useState([]);
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("제목");
  const [keyword, isKeyword] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const modalWrapperRef = useRef(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setSwowReport(false);
    setSwowReport1(true);
    if (!keyword.trim()) {
      return;
    }
    if (title === "제목") {
      axios
        .get("http://localhost:8000/BookReports")
        .then((res) => {
          const results = res.data.filter((book) =>
            book.Writer.toLowerCase().includes(keyword.toLowerCase())
          );
          const filteredReports = results.filter((item) => item.bookId === id);
          if (filteredReports.length === 0) {
            alert("검색된 내용이 없습니다.");
          } else {
            setSearchResults(filteredReports);
          }
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        console.error("검색 오류:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/booklist`)
      .then((res) => {
        console.log(res.data)
        const filteredReports = res.data.content.filter((item) => item.bookId === id);
        setNum(filteredReports.length);
        setReport(res.data.content);
      })
      .catch((error) => {
        console.error("검색 오류:", error);
      });
  }, []);

  const filteredReports = report.filter((item) => item.bookId === id);

  const BookReport = (id) => {
    navigate(`/search/${id}/BookReports`);
  };

  const read = (id) => {
    navigate(`/BookReport/${id}`)
  }

  return (
    <>
      <div className={styles.ListContainer}>
        <div className={styles.ItemContainer}>
          <div className={styles.image}></div>
          <div className={styles.tagContainer}>
            <div
              className={styles.tag}
              style={{ backgroundColor: categoryColors[results.category] }}
            >
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
                <div className={styles.Details1}>
                  {results && results.description && results.description.length > 160
                    ? results.description.slice(0, 160) + "..."
                    : results && results.description || "안떠용"}
                </div>
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
            <div className={styles.Num}>
              <input
                type="text"
                className={styles.inputText}
                value={keyword}
                onChange={(e) => isKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`독후감 ${num}개`}
              ></input>
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                disabled={!keyword}
              >
                검색
              </button>
            </div>
            <div className={styles.WriteContainer}>
              <div className={styles.Write} onClick={() => { BookReport(id) }}>
                독후감 작성하기 <div className={styles.ReportIcon}><BiSolidPencil /></div>
              </div>
            </div>
          </div>
          <div className={styles.ReviewContainer}>
  {swowReport && filteredReports.map(report => (
    <div className={styles.WriterContainer} key={report.id} onClick={() => read(report.id)}>
      <div className={styles.flexContainer}>
        <div className={styles.ReportWriter}>{report.writer}</div>
        <div className={styles.likesContainer}>
          <AiOutlineLike className={styles.likesicon} />
          <div className={styles.likesicon1}>{report.likes}</div>
        </div>
      </div>
      <div className={styles.ReportDescription}>
        {report.description.length > 172 ? report.description.slice(0, 172) + "..." : report.description || "안떠용"}
      </div>
    </div>
  ))}
  {swowReport1 && searchResults.map(report => (
    <div className={styles.WriterContainer} key={report.id} onClick={() => read(report.id)}>
      <div className={styles.flexContainer}>
        <div className={styles.ReportWriter}>{report.Writer}</div>
        <div className={styles.likesContainer}>
          <AiOutlineLike className={styles.likesicon} />
          <div className={styles.likesicon1}>{report.likes}</div>
        </div>
      </div>
      <div className={styles.ReportDescription}>
        {report.description.length > 172 ? report.description.slice(0, 172) + "..." : report.description || "안떠용"}
      </div>
    </div>
  ))}
</div>        </div>
      </div>
    </>
  )
}

export default ReadTheBook;
