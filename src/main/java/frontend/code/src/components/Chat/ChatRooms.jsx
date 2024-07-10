import styles from "../../styles/components/ChatRooms.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import InfoBar from "../Chat/InfoBar/InfoBar";
import Messages from "../Chat/Messages/Messages";
import TextContainer from "../Chat/TextContainer/TextContainer";
import Input from "../Chat/Input/Input";

const ENDPOINT = "http://3.39.223.205:5000/";
let socket;

const ChatRooms = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    if (name?.trim() && room?.trim()) {
      const storedSocketId = localStorage.getItem("socketId");

      socket = io(ENDPOINT, {
        query: { socketId: storedSocketId },
      });

      setRoom(room);
      setName(name);

      socket.emit("join", { name, room }, (error) => {
        if (error) {
          console.log(error);
        }
      });

      socket.on("connect", () => {
        localStorage.setItem("socketId", socket.id);
      });

      socket.on("previousMessages", (messages) => {
        setMessages(messages);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const roomDataListener = ({ users }) => {
      setUsers(users);
    };

    if (socket) {
      socket.on("message", messageListener);
      socket.on("roomData", roomDataListener);

      return () => {
        socket.off("message", messageListener);
        socket.off("roomData", roomDataListener);
      };
    }
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/rooms").then((response) => {
      setChatRooms(response.data);
    });
  }, []);

  const chatNavigate = (room) => {
    navigate(`/chatrooms?name=${name}&room=${room}`);
    window.location.reload();
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatListContainer}>
        <div className={styles.list}>
          {chatRooms.map((chatRoom) => (
            <div
              key={chatRoom.id}
              className={styles.chatList}
              onClick={() => chatNavigate(chatRoom.room)}
            >
              <div className={styles.one}></div>
              <div className={styles.chatRoom}>
                {chatRoom.room}
                <br />
                응애
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chat}>
        <div className={styles.outerContainer}>
          <div className={styles.container}>
            <Messages messages={messages} name={name} />
            <Input
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRooms;