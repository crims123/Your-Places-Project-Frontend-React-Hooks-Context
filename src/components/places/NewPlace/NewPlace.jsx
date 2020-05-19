import React, { useState, useEffect } from 'react';
import './NewPlace.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import useInput from '../../../hooks/useInput';

const NewPlace = () => {
  const [values, setValues, handleOnChange] = useInput({
    title: '',
    description: '',
    address: '',
  });
  useEffect(() => {
    const { title, description, address } = values;
    if (title && description && address) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNewPlaceSubmit = (e) => {
    e.preventDefault();
    console.log(values); // send to the backend
    setValues({
      title: '',
      description: '',
    });
  };

  return (
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
  );
};

export default NewPlace;
