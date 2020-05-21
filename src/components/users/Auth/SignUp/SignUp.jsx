import React, { useState, useEffect, useContext } from 'react';
import axiosClient from '../../../../config/axios';
import './SignUp.css';
import { AuthContext } from '../../../../context/auth-context';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import ErrorModal from '../../../shared/ErrorModal';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useInput from '../../../../hooks/useInput';

const SignUp = (props) => {
  const { setIsAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [values, handleOnChange] = useInput({});
  useEffect(() => {
    const { name, email, password } = values;
    if (name && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axiosClient.post('/api/users', values);
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
        <h2>Register</h2>
        <hr />
        <form onSubmit={handleSignUpSubmit}>
          <Input
            id="name"
            type="text"
            element="input"
            label="Name"
            handleOnChange={handleOnChange}
            name="name"
          />

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
            REGISTER
          </Button>
        </form>

        <Button inverse to="/auth">
          SWITCH TO LOGIN
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default SignUp;
