
import React from 'react';
import { assets } from '../assets/assets';

const Starrating = ({ rating = 0 }) => (
  <div className="flex items-center gap-1">
    {Array(5).fill(0).map((_, index) => (
      <img
        key={index}
        src={rating > index ? assets.starIconFilled : assets.starIconOutlined}
        alt={rating > index ? 'star-filled' : 'star-outlined'}
        className="w-5 h-5"
      />
    ))}
  </div>
);

export default Starrating;

