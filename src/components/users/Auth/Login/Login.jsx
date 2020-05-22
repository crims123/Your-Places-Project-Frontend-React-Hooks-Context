import React, { useState, useEffect, useContext } from 'react';
import axiosClient from '../../../../config/axios';
import './Login.css';
import { AuthContext } from '../../../../context/auth-context';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import ErrorModal from '../../../shared/ErrorModal';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useInput from '../../../../hooks/useInput';

const Login = (props) => {
  const { setIsAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axiosClient.post('/api/users/login', values);
      console.log(response)
      setIsLoading(false);
      setIsAuth(true);
      props.history.push('/');
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={handleError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverLay />}
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
    </React.Fragment>
  );
};

export default Login;
