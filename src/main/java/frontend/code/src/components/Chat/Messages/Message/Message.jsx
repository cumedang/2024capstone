import React from 'react';
import styles from './Message.module.css';
import ReactEmoji from 'react-emoji';

function Message({ message: { user, text }, name }) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={`${styles.messageContainer} ${styles.justifyEnd}`}>
      <p className={`${styles.sentText} ${styles.pr10}`}>{trimmedName}</p>
      <div className={`${styles.messageBox} ${styles.backgroundBlue}`}>
        <p className={`${styles.messageText} ${styles.colorWhite}`}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className={`${styles.messageContainer} ${styles.justifyStart}`}>
      <p className={`${styles.sentText} ${styles.pl10}`}>{user}</p>
      <div className={`${styles.messageBox} ${styles.backgroundLight}`}>
        <p className={`${styles.messageText} ${styles.colorDark}`}>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  );
}

export default Message;
