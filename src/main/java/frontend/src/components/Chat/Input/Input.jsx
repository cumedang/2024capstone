import React from 'react';

import styles from './Input.module.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className={styles.form}>
    <input
      className={styles.input}
      type="text"
      placeholder="전송하려는 메시지를 입력하세요."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage : null}
    />
    <button className={styles.sendButton} onClick={sendMessage}>전송</button>
  </form>
)

export default Input;