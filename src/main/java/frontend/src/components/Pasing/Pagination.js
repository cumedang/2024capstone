import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalItems, itemCountPerPage, pageCount, currentPage, onPageChange }: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage);
  const [start, setStart] = useState(1);
  const noPrev = start === 1;
  const noNext = start + pageCount - 1 >= totalPages;

  useEffect(() => {
    if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
    if (currentPage < start) setStart((prev) => prev - pageCount);
  }, [currentPage, pageCount, start]);

  return (
    <div className={styles.wrapper}>
      <ul>
        <li className={`${styles.move} ${noPrev && styles.invisible}`}>
          <button onClick={() => onPageChange(start - 1)} disabled={noPrev}>이전</button>
        </li>
        {[...Array(pageCount)].map((a, i) => (
          start + i <= totalPages && (
            <li key={i}>
              <button
                className={`${styles.page} ${currentPage === start + i && styles.active}`}
                onClick={() => onPageChange(start + i)}
              >
                {start + i}
              </button>
            </li>
          )
        ))}
        <li className={`${styles.move} ${noNext && styles.invisible}`}>
          <button onClick={() => onPageChange(start + pageCount)} disabled={noNext}>다음</button>
        </li>
      </ul>
    </div>
  );
}
