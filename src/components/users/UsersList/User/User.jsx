import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';
import Avatar from '../../../shared/Avatar';
import Card from '../../../shared/Card';

const User = ({ id, image, name, placeCount }) => {
  return (
    <li className="user-item">
      <Link to={`/${id}/places`}>
        <div className="user-item__image">
          <Avatar image={image} alt={name} />
        </div>
        <div className="user-item__info">
          <h2>{name}</h2>
          <h3>
            {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
          </h3>
        </div>
      </Link>
    </li>
  );
};

export default User;
