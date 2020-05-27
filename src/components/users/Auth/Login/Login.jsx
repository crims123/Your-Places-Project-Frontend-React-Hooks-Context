import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { AuthContext } from '../../../../context/auth-context';
import useFetchOnSubmit from '../../../../hooks/useFetchOnSumbit';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import ErrorModal from '../../../shared/ErrorModal';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useInput from '../../../../hooks/useInput';

const Login = () => {
  const { setIsAuth, setUserId, setToken } = useContext(AuthContext);
  const [fetchData, isLoading, error, handleError] = useFetchOnSubmit();
  const history = useHistory();

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
    const response = await fetchData('/api/users/login', 'post', values);
    if (response) {
      setUserId(response.data.data.userId);
      setToken(response.data.data.token);
      setIsAuth(true);
      history.push('/');
    }
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
