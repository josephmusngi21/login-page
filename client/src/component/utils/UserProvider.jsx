import React, { useState, useContext } from 'react';
import styles from '../styles/Login.module.css';
import axios from 'axios';

export const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      setUser(response.data.user);  // Store the user data in the context
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          <input type="text" name="email" placeholder='Enter Email:' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <input type="password" name="password" placeholder='Enter Password' className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <input type="submit" value="Sign In" className={styles.button}/>
      </form>
    </div>
  );
}

export default Login;
