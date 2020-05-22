import React from 'react';
import './PlaceList.css';
import PlaceItem from './PlaceItem';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';
import useFetch from '../../../hooks/useFetch';
import { useParams } from 'react-router-dom';

const PlaceList = () => {
  const userId = useParams().userId;
  const [places, isLoading, error, handleError] = useFetch(`api/places/user/${userId}`);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverLay />
      </div>
    );
  }

  if (places && !places.length) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Create Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      <ErrorModal error={error} onClear={handleError} />
      {places && places.map(
        ({ _id, imageUrl, title, description, address, creator, location }) => (
          <PlaceItem
            key={_id}
            id={_id}
            image={imageUrl}
            title={title}
            description={description}
            address={address}
            creatorId={creator}
            coordinates={location}
          />
        )
      )}
    </ul>
  );
};

export default PlaceList;
