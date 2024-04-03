import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/components/SearchList.module.css";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import  axios  from "axios";

const SearchList = () => {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("제목");
  const [keyword, isKeyword] = useState("");
  const [data, setData] = useState([]);
  const modalWrapperRef = useRef(null);
  const clickBoxRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/books`)
    .then(res => {
      setData(res.data);
    })
  },[])

  const handleClickList = () => {
    setClick(prevState => !prevState)
  }

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
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className={styles.ListContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <div className={styles.clickBox} ref={clickBoxRef} onClick={handleClickList}>
              {title}
              <div className={styles.icon}>
                {click ? <SlArrowUp /> : <SlArrowDown/>}
              </div>
            </div>
            {click && (
              <div ref={modalWrapperRef} className={styles.clickListContainer}>
                  <div className={styles.clickList} onClick={() => handleBoxClick('제목')}>제목</div>
                  <div className={styles.clickList} onClick={() => handleBoxClick('내용')}>내용</div>
                  <div className={styles.clickList} onClick={() => handleBoxClick('태그')}>태그</div>
                  <div className={styles.clickList} onClick={() => handleBoxClick('저자')}>저자</div>
              </div>
            )}
            <input type="text" className={styles.inputText} value={keyword} onChange={(e) => isKeyword(e.target.value)}></input>
            <button className={styles.searchButton} >검색</button>
          </div>
        </div>
              <div className={styles.listContainer}>
              <div className={styles.listContainer}>
              {data.map((item, index) => (
                <div key={index} className={styles.itemContainer}>
                  <div className={styles.imgContainer}></div>
                  <div>
                    <div className={styles.list}>
                      <div>{item.category}</div>
                      제목: {item.title} 
                      내용: {item.description}
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
