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
    socket = io(ENDPOINT);
    socket.emit('join', {name, room}, (err) => {
      if (err) {
        alert(err);
      }
    });
    return () => {
      socket.disconnect();
    }
  }, [ENDPOINT, window.location.search]);
  
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
    socket.on('roomData', ({users}) => {
      setUsers(users);
    });
  }, [messages, users]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
    socket.on('roomData', ({users}) => {
      setUsers(users);
    });
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
