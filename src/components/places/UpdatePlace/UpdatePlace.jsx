import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './UpdatePlace.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';
import useInput from '../../../hooks/useInput';
import useFetch from '../../../hooks/useFetch';
import useFetchOnSubmit from '../../../hooks/useFetchOnSumbit';

const UpdatePlace = () => {
  const placeId = useParams().placeId;
  const [fetchData, , errorUpdate, handleErrorUpdate] = useFetchOnSubmit();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

  const [values, handleOnChange, setValues] = useInput({});
  useEffect(() => {
    const { title, description, address } = values;
    if (title && description && address) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [place, isLoading, error, handleError] = useFetch(
    `api/places/${placeId}`
  );
  useEffect(() => {
    if (place) {
      const { title, description, address } = place;
      setValues({ title, description, address });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  const handleUpdatePlaceSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData(`/api/places/${placeId}`, 'put', values);
    if (response) {
      history.push('/');
    }
  };

  if (!place || isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverLay />
      </div>
    );
  }

  const { title, description, address } = place;

  return (
    <form className="update-place" onSubmit={handleUpdatePlaceSubmit}>
      <ErrorModal error={error} onClear={handleError} />
      <ErrorModal error={errorUpdate} onClear={handleErrorUpdate} />
      <Input
        id="title"
        type="text"
        placeholder={title}
        element="input"
        label="Title"
        handleOnChange={handleOnChange}
        name="title"
      />

      <Input
        id="description"
        type="text"
        placeholder={description}
        label="Description"
        handleOnChange={handleOnChange}
        name="description"
      />

      <Input
        id="address"
        type="text"
        placeholder={address}
        element="input"
        label="Address"
        handleOnChange={handleOnChange}
        name="address"
      />

      <Button type="submit" disabled={buttonDisabled}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
