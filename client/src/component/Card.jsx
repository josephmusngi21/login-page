import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import styles from '../styles/Card.module.css';

function Card() {
  const [formType, setFormType] = useState('login');

  const handleButtonClick = () => {
    setFormType(formType === 'login' ? 'register' : 'login');
  };

  return (
    <div id='Card' className={styles.container}>
      <div id='top'></div>
      
      {formType === 'login' ? <Login /> : <Register />}
      
      <button id='register' onClick={handleButtonClick} className={styles.button}>
        {formType === 'login' ? 'Not a member? Sign Up' : 'Already a member? Sign In'}
      </button>
    </div>
  );
}

export default Card;
