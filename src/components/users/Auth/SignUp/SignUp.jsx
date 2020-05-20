import React, { useState, useEffect } from 'react';
import './SignUp.css';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import useInput from '../../../../hooks/useInput';

const SignUp = () => {
  const [values, setValues, handleOnChange] = useInput({});
  useEffect(() => {
    const { name, email, password } = values;
    if (name && email && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    console.log(values); // send to the backend
  };

  return (
    <Card className="authentication">
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
  );
};

export default SignUp;
