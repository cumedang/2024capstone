import styles from "../styles/components/ChatRooms.module.css";

const ChatRooms = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.userList}></div>
          <div classNmae={styles.chatArea}></div>
        </div>
      </div>
    </>
  );
};

export default ChatRooms;
