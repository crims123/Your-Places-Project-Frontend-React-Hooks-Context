import React, { useState, useEffect, useContext } from 'react';
import './Login.css';
import { AuthContext } from '../../../../context/auth-context';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import useInput from '../../../../hooks/useInput';

const Login = (props) => {
  const { setIsAuth } = useContext(AuthContext);

  const [values, handleOnChange] = useInput({});
  useEffect(() => {
    const { email, password } = values;
    if (email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(values); // send to the backend
    setIsAuth(true);
    props.history.push('/')
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={handleLoginSubmit}>
        <Input
          id="email"
          type="email"
          element="input"
          label="Email"
          handleOnChange={handleOnChange}
          name="email"
        />

        <Input
          id="password"
          type="password"
          element="input"
          label="Password"
          handleOnChange={handleOnChange}
          name="password"
        />

        <Button type="submit" disabled={buttonDisabled}>
          LOGIN
        </Button>
      </form>

      <Button inverse to="/signup">
        SWITCH TO SIGNUP
      </Button>
    </Card>
  );
};

export default Login;
