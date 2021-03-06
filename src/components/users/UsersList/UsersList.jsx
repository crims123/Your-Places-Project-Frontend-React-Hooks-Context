import React from 'react';
import './UsersList.css';
import User from './User';
import useFetch from '../../../hooks/useFetch';
import Card from '../../shared/Card';
import ErrorModal from '../../shared/ErrorModal';
import LoadingSpinner from '../../shared/LoadingSpinner';

const UsersList = () => {
  const [users, isLoading, error, handleError] = useFetch('api/users');

  if (!users || isLoading)
    return (
      <div className="center">
        <LoadingSpinner asOverLay />
      </div>
    );

  if (!users.length) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={handleError} />
      <ul className="users-list">
        {users.map(({ _id, image, name, places }) => (
          <User
            key={_id}
            id={_id}
            image={image}
            name={name}
            placeCount={places.length}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default UsersList;
