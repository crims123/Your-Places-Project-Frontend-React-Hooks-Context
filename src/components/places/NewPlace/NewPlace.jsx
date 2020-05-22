import React, { useState, useEffect } from 'react';
import './NewPlace.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/ErrorModal';
import useInput from '../../../hooks/useInput';
import useFetchOnSubmit from '../../../hooks/useFetchOnSumbit';

const NewPlace = (props) => {
  const [fetchData, , error, handleError] = useFetchOnSubmit();

  const [values, handleOnChange] = useInput({});
  useEffect(() => {
    const { title, description, address } = values;
    if (title && description && address) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNewPlaceSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchData('/api/places', 'post', values);
    if (response) {
      props.history.push('/');
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={handleError} />
      <form className="place-form" onSubmit={handleNewPlaceSubmit}>
        <Input
          id="title"
          type="text"
          placeholder="Add Title"
          element="input"
          label="Title"
          handleOnChange={handleOnChange}
          name="title"
        />

        <Input
          id="description"
          type="text"
          placeholder="Add Description"
          label="Description"
          handleOnChange={handleOnChange}
          name="description"
        />

        <Input
          id="address"
          type="text"
          placeholder="Add Address"
          element="input"
          label="Address"
          handleOnChange={handleOnChange}
          name="address"
        />

        <Button type="submit" disabled={buttonDisabled}>
          Create
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
