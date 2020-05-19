import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdatePlace.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import useInput from '../../../hooks/useInput';

const places = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Emp. State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u2',
  },
];

const UpdatePlace = () => {
  const placeId = useParams().placeId;

  const { title, description, address } = places.find(
    (place) => place.id === placeId
  );

  const [values, setValues, handleOnChange] = useInput({
    title,
    description,
    address,
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

  const handleUpdatePlaceSubmit = (e) => {
    e.preventDefault();
    console.log(values); // send to the backend Update place
  };

  return (
    <form className="place-form" onSubmit={handleUpdatePlaceSubmit}>
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
