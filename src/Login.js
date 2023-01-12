import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './App.css';
import './index.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleLogin = async () => {
    let isValid = true;

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!/^[a-zA-Z]+$/.test(password)) {
      setPasswordError('Please enter a valid password');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200 && response.data.token) {
        history.push('/home');
      } else {
        setServerError('Wrong email or password');
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data.error);
      } else {
        setServerError('Error server');
      }
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={handleEmailChange} />
        {emailError && <p className="error">{emailError}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="error">{passwordError}</p>}
      </div>
      <button onClick={handleLogin}>Login</button>
      {serverError && <p className="error">{serverError}</p>}
    </div>
  );
}

export default LoginPage;
