import React, { useState, useEffect } from 'react';
import './NewPlace.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/ErrorModal';
import UploadImages from '../../shared/UploadImages';
import useInput from '../../../hooks/useInput';
import useFetchOnSubmit from '../../../hooks/useFetchOnSumbit';

const NewPlace = (props) => {
  const [fetchData, , error, handleError] = useFetchOnSubmit();
  const [loadedImage, setLoadedImage] = useState();

  const [values, handleOnChange] = useInput({});
  useEffect(() => {
    const { title, description, address } = values;
    if (
      title &&
      description &&
      address &&
      loadedImage &&
      loadedImage.isLoadedImage
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [values, loadedImage]);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNewPlaceSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('address', values.address);
    formData.append('image', loadedImage.file);

    const response = await fetchData('/api/places', 'post', formData);
    if (response) {
      props.history.push('/');
    }
  };

  const handleLoadedImage = (data) => {
    setLoadedImage(data);
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

        <UploadImages
          id="image-upload"
          center
          handleLoadedImage={handleLoadedImage}
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
