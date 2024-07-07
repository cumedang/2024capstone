import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/Shop.module.css";
import { FaShop } from "react-icons/fa6";
import { MdLocalParking } from "react-icons/md";
import { setCookie, getCookie, removeCookie } from "../utils/cookie";

const Shop = () => {
  const [category, setCategory] = useState("1");
  const [itemList, setItemList] = useState([]);
  const [profile, setProfile] = useState({ point: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchItem, setSearchItem] = useState([]);

  useEffect(() => {
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/pointshop/${category}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setItemList(res.data)
    })
  }, [category]);

  useEffect(() => {
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data)
      setProfile(res.data)
    })
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setIsModalOpen(true);
      search();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const search = () => {
    const token = getCookie("Authorization");
    axios.get(`http://3.39.223.205/poinshop/select/${searchTerm}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data)
      setSearchItem(res.data);
    })
  }

  const Modal = ({ closeModal }) => {
    return (
      <div className={styles.modalOverlay} onClick={closeModal}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.searchText}>검색 결과</h2>
          <p className={styles.searchText}>검색어: {searchTerm}</p>
          {searchItem.map(item => (
            <div key={item.id} className={styles.searchContainer}>
              <div className={styles.imgContainer}><img src={item.photolink} className={styles.searchImg}></img></div>
                <div className={styles.cContainer}>
                  <div className={styles.searchItemName}>{item.name}번 젤리</div>
                  <div className={styles.searchItemCategory}>{item.category}번 카테고리</div>
                </div>
                <div className={styles.view1}><div className={styles.view}><div className={styles.icon1}><MdLocalParking className={styles.Micon1}/></div>{item.price}</div></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.alignList}>
        <div className={styles.itemContainer}>
          <input 
            type="text" 
            placeholder="검색" 
            className={styles.itemSearch}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.category} onClick={() => setCategory("1")}><FaShop className={styles.shop}/>카테고리 1</div>
          <div className={styles.category} onClick={() => setCategory("2")}><FaShop className={styles.shop}/>카테고리 2</div>
          <div className={styles.category} onClick={() => setCategory("3")}><FaShop className={styles.shop}/>카테고리 3</div>
          <div className={styles.category} onClick={() => setCategory("4")}><FaShop className={styles.shop}/>카테고리 4</div>
          <div className={styles.category} onClick={() => setCategory("5")}><FaShop className={styles.shop}/>카테고리 5</div>
        </div>
      </div>
      <div className={styles.itemList}>
        <div className={styles.categoryBar}>  
          <div className={styles.categoryName}>{category}번 카테고리</div>
          <div className={styles.point}><div className={styles.icon}><MdLocalParking className={styles.Micon}/></div> {profile.point} 포인트</div>
        </div>
        <div className={styles.itembox}>
          {itemList.map(item => (
            <div key={item.id} className={styles.mapContainer}>
              <div className={styles.itemImg}><img src={item.photolink} className={styles.iImg} alt={item.name}/></div>
              <div className={styles.itemName}>{item.name}번 젤리</div>
              <div className={styles.mapContainer1}>
                <div className={styles.price}><div className={styles.icon1}><MdLocalParking className={styles.Micon1}/></div>{item.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Shop;
