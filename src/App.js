import axios from 'axios';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import './App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Invalid email');
      return;
    } else if (!/^[a-zA-Z]+$/.test(password)) {
      setError('Invalid password');
      return;
    }

    const requestObject = {
      email: email,
      password: password,
    };

    axios
      .post('https://reqres.in/api/login', requestObject)
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setError('');
          navigate('/home', { name: response.data.name });
        } else {
          setError('Incorrect email or password');
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
        setError('Error Connecting');
      });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/home" component={Home} />
      </Routes>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
