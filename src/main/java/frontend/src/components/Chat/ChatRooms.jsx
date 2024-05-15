import styles from "../../styles/components/ChatRooms.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from "../Chat/InfoBar/InfoBar"
import Messages from "../Chat/Messages/Messages"
import TextContainer from "../Chat/TextContainer/TextContainer";
import Input from "../Chat/Input/Input";

const ENDPOINT = 'http://localhost:5000';
let socket;

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search)

    console.log(name, room)

    socket = io(ENDPOINT)

    setRoom(room)
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        console.log(error)
      }
    })
  }, [ENDPOINT, window.location.search])

  useEffect(() => {
    const messageListener = (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    };
  
    const roomDataListener = ({users}) => {
      setUsers(users);
    };
  
    socket.on('message', messageListener);
    socket.on('roomData', roomDataListener);
  
    return () => {
      socket.off('message', messageListener);
      socket.off('roomData', roomDataListener);
    };
  }, []); 
  
  
  
  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8000/chatRooms").then((response) => {
      setChatRooms(response.data);
    });
  }, []);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        {chatRooms.map((chatRoom) => (
          <div key={chatRoom.id} className={styles.chatList}>
            {chatRoom.name}
          </div>
        ))}
      </div>
      <div className={styles.chat}>
        <div className={styles.outerContainer}>
          <div className={styles.container}>
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
          <TextContainer users={users} />
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;
