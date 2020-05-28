import React, { useState, useContext } from 'react';
import './PlaceItem.css';
import { AuthContext } from '../../../../context/auth-context';
import Card from '../../../shared/Card';
import Button from '../../../shared/Button';
import Modal from '../../../shared/Modal';
import ErrorModal from '../../../shared/ErrorModal';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import Map from '../../../shared/Map';
import useFetchOnSubmit from '../../../../hooks/useFetchOnSumbit';

const PlaceItem = ({
  id,
  image,
  title,
  description,
  address,
  coordinates,
  handleDeletePlace,
}) => {
  const { isAuth } = useContext(AuthContext);
  const [fetchData, isLoading, error, handleError] = useFetchOnSubmit();

  const [showMapModal, setShowMapModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleOpenMapModal = () => {
    setShowMapModal(true);
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    const response = await fetchData(`/api/places/${id}`, 'delete');
    if (response) {
      handleDeletePlace(id);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={handleError} />
      <Modal
        show={showMapModal}
        onCancel={handleOpenMapModal}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={handleCloseMapModal}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>

      <Modal
        show={showDeleteModal}
        onCancel={handleCloseDeleteModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={handleCloseDeleteModal}>
              CANCEL
            </Button>
            <Button danger onClick={handleConfirmDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverLay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/${image}`}
              alt={title}
            />
          </div>

          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>

          <div className="place-item__actions">
            <Button
              inverse={isAuth ? false : true}
              onClick={handleOpenMapModal}
            >
              VIEW ON MAP
            </Button>
            {isAuth && (
              <React.Fragment>
                <Button to={`/places/${id}`}>EDIT</Button>
                <Button onClick={handleOpenDeleteModal}>DELETE</Button>
              </React.Fragment>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
