import React, { useRef, useState, useEffect } from 'react';
import './UploadImages.css';
import Button from '../Button';

const UploadImages = ({ id, center, handleLoadedImage, errorText }) => {
  const [file, setFile] = useState(null);
  const [isValidFile, setIsValidFile] = useState(false);
  const [previousImageUrl, setPreviousImageUrl] = useState(null);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviousImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const handlerImage = (e) => {
    let isLoadedImage;
    let file;
    if (e.target.files && e.target.files.length) {
      file = e.target.files[0];
      setFile(file);
      isLoadedImage = true;
      setIsValidFile(true);
    } else {
      isLoadedImage = false;
      setIsValidFile(false);
    }
    handleLoadedImage({ file, isLoadedImage, id });
  };

  const handlerPickImage = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={handlerImage}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {!previousImageUrl ? (
            <p>Please select an image</p>
          ) : (
            <img src={previousImageUrl} alt="Preview" />
          )}
        </div>
        <Button type="button" onClick={handlerPickImage}>
          PICK IMAGE
        </Button>
      </div>
      {!isValidFile && <p>{errorText}</p>}
    </div>
  );
};

export default UploadImages;
