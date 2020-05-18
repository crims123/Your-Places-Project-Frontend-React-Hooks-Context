import React from 'react';
import UsersList from '../UsersList';

const Users = () => {
  const usersMockData = [
    {
      id: 1,
      image:
        'https://www.cicnews.com/wp-content/uploads/2020/05/20200506canadianuni-1.jpg',
      name: 'Cristian',
      placeCount: 3,
    },
  ];
  return <UsersList users={usersMockData} />;
};

export default Users;
