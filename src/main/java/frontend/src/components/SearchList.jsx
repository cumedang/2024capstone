import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/components/SearchList.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { FaPen } from "react-icons/fa6";

const SearchList = () => {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("제목");
  const [keyword, isKeyword] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const modalWrapperRef = useRef(null);
  const clickBoxRef = useRef(null);
  const navigate = useNavigate();

  //useEffect(() => {
    //const key = "ttbkimsunghoon1221703002";
    //axios.get(`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${key}&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=xml&Version=20131101`)
    //.than((res) => {
      //console.log(res.data);
    //})
  //})

  useEffect(() => {
    axios.get(`http://localhost:8000/books`).then((res) => {
      setData(res.data);
    });
  }, []);

  const handleClickList = () => {
    setClick((prevState) => !prevState);
  };

  const handleBoxClick = (type) => {
    setTitle(type);
    setClick(false);
  };

  const handleOutsideClick = (event) => {
    if (
      modalWrapperRef.current &&
      !modalWrapperRef.current.contains(event.target) &&
      !clickBoxRef.current.contains(event.target)
    ) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

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

  const handleSearch = () => {
    if (!keyword.trim()) {
      return;
    }
    if (title === "제목") {
      axios
        .get("http://localhost:8000/books")
        .then((res) => {
          const results = res.data.filter((book) =>
            book.title.toLowerCase().includes(keyword.toLowerCase())
          );
          if (results.length === 0) {
            alert("검색된 내용이 없습니다.");
          } else {
            setSearchResults(results);
          }
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    } else if (title === "내용") {
      axios
        .get("http://localhost:8000/books")
        .then((res) => {
          const results = res.data.filter((book) =>
            book.description.toLowerCase().includes(keyword.toLowerCase())
          );
          if (results.length === 0) {
            alert("검색된 내용이 없습니다.");
          } else {
            setSearchResults(results);
          }
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    } else if (title === "저자") {
      axios
        .get("http://localhost:8000/books")
        .then((res) => {
          const results = res.data.filter((book) =>
            book.author.toLowerCase().includes(keyword.toLowerCase())
          );
          if (results.length === 0) {
            alert("검색된 내용이 없습니다.");
          } else {
            setSearchResults(results);
          }
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    } else if (title === "태그") {
      axios
        .get("http://localhost:8000/books")
        .then((res) => {
          const results = res.data.filter((book) =>
            book.category.toLowerCase().includes(keyword.toLowerCase())
          );
          if (results.length === 0) {
            alert("검색된 내용이 없습니다.");
          } else {
            setSearchResults(results);
          }
        })
        .catch((error) => {
          console.error("검색 오류:", error);
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClickImg = (id) => {
    navigate(`/read/${id}`);
  };

  return (
    <div>
      <div className={styles.ListContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <div
              className={styles.clickBox}
              ref={clickBoxRef}
              onClick={handleClickList}
            >
              {title}
              <div className={styles.icon}>
                {click ? <SlArrowUp /> : <SlArrowDown />}
              </div>
            </div>
            {click && (
              <div ref={modalWrapperRef} className={styles.clickListContainer}>
                <div
                  className={styles.clickList}
                  onClick={() => handleBoxClick("제목")}
                >
                  제목
                </div>
                <div
                  className={styles.clickList}
                  onClick={() => handleBoxClick("내용")}
                >
                  내용
                </div>
                <div
                  className={styles.clickList}
                  onClick={() => handleBoxClick("태그")}
                >
                  태그
                </div>
                <div
                  className={styles.clickList}
                  onClick={() => handleBoxClick("저자")}
                >
                  저자
                </div>
              </div>
            )}
            <input
              type="text"
              className={styles.inputText}
              value={keyword}
              onChange={(e) => isKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            ></input>
            <button
              className={styles.searchButton}
              onClick={handleSearch}
              disabled={!keyword}
            >
              검색
            </button>
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.listContainer}>
            {searchResults.map((item, index) => (
              <div key={index} className={styles.itemContainer}
              onClick={() => {
                handleClickImg([item.id]);
              }}
              >
                <div className={styles.imgContainer}></div>
                <div className={styles.infoContainer}>
                  <div className={styles.list}>
                    <div
                      className={styles.tag}
                      style={{ backgroundColor: categoryColors[item.category] }}
                    >
                      {item.category}
                    </div>
                    <div className={styles.titleText}>{item.title}</div>
                    <div className={styles.Author}>{item.author}</div>
                    <div className={styles.descriptionText}>
                      {item.description}
                    </div>
                  </div>
                  <div className={styles.contour}></div>
                  <div className={styles.AuthorContainer}>
                    <div className={styles.likes}>
                      <AiOutlineHeart />
                      &nbsp;{item.likes}
                    </div>
                    <div className={styles.BookReports}>
                      <FaPen />
                      &nbsp;{item.BookReports}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
