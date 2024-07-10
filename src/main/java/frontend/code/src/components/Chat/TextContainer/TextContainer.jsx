import React from 'react';

import onlineIcon from '../../Img/onlineIcon.png';

import styles from './TextContainer.module.css';

function TextContainer({ users }) {
  return (
    <div className={styles.textContainer}>
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