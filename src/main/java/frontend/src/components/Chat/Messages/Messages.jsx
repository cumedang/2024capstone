import React, {useEffect} from 'react';

import BasicScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";

import styles from './Messages.module.css';

function Messages({ messages, name }) {


  return (
    <BasicScrollToBottom className={styles.messages}>
      <div className={styles.MessagesContainer}>
        {messages.map((message, i) => {
          return <div key={i}><Message message={message} name={name} /></div>
        })}
      </div>
    </BasicScrollToBottom>
  );
}

export default Messages;