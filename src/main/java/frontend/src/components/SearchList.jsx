import React, { useState } from "react";
import styles from "../styles/components/SearchList.module.css";
import { SlArrowDown } from "react-icons/sl";

const SearchList = () => {
  const [click, setClick] = useState(false);
  const [title, setTitle] = useState("");
  return (
    <div>
      <div className={styles.ListContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.search}>
            <div className={styles.clickBox}>제목 <div className={styles.icon}><SlArrowDown/></div></div>
            <input type="text" className={styles.inputText}></input>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchList;
