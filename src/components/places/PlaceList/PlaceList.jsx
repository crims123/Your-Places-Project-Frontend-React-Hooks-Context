import React, { useContext } from 'react';
import './PlaceList.css';
import { AuthContext } from '../../../context/auth-context';
import PlaceItem from './PlaceItem';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';

const PlaceList = () => {
  const userId = useParams().userId;
  const { userId: idLoggedUser } = useContext(AuthContext);
  const [places, isLoading, error, handleError, setPlaces] = useFetch(
    `api/places/user/${userId}`
  );

  if (!places || isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverLay />
      </div>
    );
  }

  if (!places.length) {
    return (
      <div className="place-list center">
        {userId === idLoggedUser ? (
          <Card>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Create Place</Button>
          </Card>
        ) : (
          <Card>
            <h2>No places found.</h2>
          </Card>
        )}
      </div>
    );
  }

  const handleDeletePlace = (deletedPlaceId) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place._id !== deletedPlaceId)
    );
  };

  return (
    <ul className="place-list">
      <ErrorModal error={error} onClear={handleError} />
      {places.map(
        ({ _id, image, title, description, address, creator, location }) => (
          <PlaceItem
            key={_id}
            id={_id}
            image={image}
            title={title}
            description={description}
            address={address}
            creatorId={creator}
            coordinates={location}
            handleDeletePlace={handleDeletePlace}
          />
        )
      )}
    </ul>
  );
};

export default PlaceList;
