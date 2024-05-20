import React from 'react';

import onlineIcon from '../../Img/onlineIcon.png';

import styles from './TextContainer.module.css';

function TextContainer({ users }) {
  return (
    <div className={styles.textContainer}>
      <div>
        <h1>
          실시간 채팅 프로그램{' '}
          <span role='img' aria-label='emoji'>
          💬
        </span>
        </h1>
        <h2>
          Created with React, Express, Node and Socket.IO{' '}
          <span role='img' aria-label='emoji'>
          ❤️
        </span>
        </h2>
        <h2>
          Try it out right now!{' '}
          <span role='img' aria-label='emoji'>
          ⬅️
        </span>
        </h2>
      </div>
      {users ? (
        <div>
          <h1>현재 채팅중인 사람들 : </h1>
          <div className={styles.activeContainer}>
            <h2>
              {users.map(({ name }) => (
                <div key={name} className={styles.activeItem}>
                  {name}
                  <img alt='Online Icon' src={onlineIcon} />
                </div>
              ))}
            </h2>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TextContainer;