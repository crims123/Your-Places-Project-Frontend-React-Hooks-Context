import React from 'react';
import './UsersList.css';
import User from './User';
import Card from '../../shared/Card';

const UsersList = () => {
  const users = [
    {
      id: 1,
      image:
        'https://www.cicnews.com/wp-content/uploads/2020/05/20200506canadianuni-1.jpg',
      name: 'Cristian',
      placeCount: 3,
    },
  ];

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
