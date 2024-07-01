import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsChatFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineLike } from "react-icons/ai";
import styles from "../styles/components/ReadTheBook.module.css";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

const ReadTheBook = () => {
  const clickBoxRef = useRef(null);
  const [showReport, setShowReport] = useState(true);
  const [showReport1, setShowReport1] = useState(false);
  const { id } = useParams();
  const [results, setResults] = useState({});
  const [report, setReport] = useState([]);
  const [num, setNum] = useState(0);
  const navigate = useNavigate();
  const [title, setTitle] = useState("제목");
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPages] = useState(0);

  const categoryColors = {
    총류: "#ff0000",
    철학: "#ff9100",
    종교: "#fff202",
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
    setShowReport(false);
    setShowReport1(true);
    if (!keyword.trim()) {
      return;
    }
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
          setCurrentPage(1);
        }
      })
      .catch((error) => {
        console.error("검색 오류:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((error) => {
        console.error("책 정보 불러오기 오류:", error);
      });
  }, [id]);

  useEffect(() => {
    fetchData(page);
  }, [page]);


  const fetchData = async (page) => {
      console.log(page)
      const token = getCookie("Authorization");
      axios
        .get(`http://3.39.223.205/reportlist?page=${page}&size=20`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((res) => {
          console.log(res.data)
          const filteredReports = res.data.content.filter((item) => item.bookId === id);
          setNum(filteredReports.length);
          setData(filteredReports);
          setTotalPages(res.data.totalPages);
        })
        .catch((error) => {
          console.error("독후감 불러오기 오류:", error);
        });
  }
  

  const BookReport = (id) => {
    navigate(`/search/${id}/BookReports`);
  };

  const read = (id) => {
    navigate(`/BookReport/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


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
                <div className={styles.Details1}>{num}</div>
                <div className={styles.Details1}>
                  {results.description && results.description.length > 160
                    ? results.description.slice(0, 160) + "..."
                    : results.description || "안떠용"}
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
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`독후감 ${num}개`}
              />
              <button
                className={styles.searchButton}
                onClick={handleSearch}
                disabled={!keyword}
              >
                검색
              </button>
            </div>
            <div className={styles.WriteContainer}>
              <div className={styles.Write} onClick={() => BookReport(id)}>
                독후감 작성하기 <div className={styles.ReportIcon}><BiSolidPencil /></div>
              </div>
            </div>
          </div>
          <div className={styles.ReviewContainer}>
            {data.map(report => (
              <div className={styles.WriterContainer} key={report.id} onClick={() => read(report.no)}>
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
          </div>
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {totalPage}</span>
          <button onClick={() => setPage(page + 1)} disabled={page + 1 >= totalPage}>Next</button>
        </div>
      </div>
    </>
  );
};

export default ReadTheBook;
