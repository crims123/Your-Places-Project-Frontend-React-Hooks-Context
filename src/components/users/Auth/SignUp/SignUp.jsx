import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUp.css';
import { AuthContext } from '../../../../context/auth-context';
import useFetchOnSubmit from '../../../../hooks/useFetchOnSumbit';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import Card from '../../../shared/Card';
import ErrorModal from '../../../shared/ErrorModal';
import UploadImages from '../../../shared/UploadImages';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import useInput from '../../../../hooks/useInput';

const SignUp = () => {
  const { setIsAuth, setUserId, setToken } = useContext(AuthContext);
  const [fetchData, isLoading, error, handleError] = useFetchOnSubmit();
  const [loadedImage, setLoadedImage] = useState();
  const history = useHistory();

  const [values, handleOnChange] = useInput({});
  useEffect(() => {
    const { name, email, password } = values;
    if (name && email && password && loadedImage && loadedImage.isLoadedImage) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values, loadedImage]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('image', loadedImage.file);

    const response = await fetchData('/api/users', 'post', formData);
    if (response) {
      setUserId(response.data.data.userId);
      setToken(response.data.data.token);
      setIsAuth(true);
      history.push('/');
    }
  };

  const handleLoadedImage = (data) => {
    setLoadedImage(data);
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

          <UploadImages
            id="image-upload"
            center
            handleLoadedImage={handleLoadedImage}
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
