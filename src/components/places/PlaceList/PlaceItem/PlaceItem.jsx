import React, { useState } from 'react';
import './PlaceItem.css';
import Card from '../../../shared/Card';
import Button from '../../../shared/Button';
import Modal from '../../../shared/Modal';

const PlaceItem = ({ id, image, title, description, address }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={handleCloseModal}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={handleCloseModal}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>

      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
          </div>

          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>

          <div className="place-item__actions">
            <Button onClick={handleOpenModal}>VIEW ON MAP</Button>
            <Button to={`places/${id}`}>EDIT</Button>
            <Button>DELETE</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
