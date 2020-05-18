import React from 'react';
import './UsersList.css';
import User from './User';
import Card from '../../shared/Card';

const UsersList = ({ users }) => {
  if (!users.length)
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );

  return (
    <ul className="users-list">
      {users.map(({ id, image, name, placeCount }) => (
        <User
          key={id}
          id={id}
          image={image}
          name={name}
          placeCount={placeCount}
        />
      ))}
    </ul>
  );
};

export default UsersList;
