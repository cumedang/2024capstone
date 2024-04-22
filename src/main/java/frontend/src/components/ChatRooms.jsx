import styles from '../styles/components/ChatRooms.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/chatRooms')
      .then(response => {
        setChatRooms(response.data);
      })

    axios.get('http://localhost:8000/Chats')
      .then(response => {
        setMessages(response.data);
      })
  }, []);

  return(
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        {chatRooms.map(chatRoom => (
          <div key={chatRoom.id} className={styles.chatList}>
            {chatRoom.name}
          </div>
        ))}
      </div>
      <div className={styles.chat}>
    
      </div>
    </div>
  );
}

export default ChatRooms;
