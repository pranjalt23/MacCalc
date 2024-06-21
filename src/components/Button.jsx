import React from 'react';
import './Button.css';

const Button = ({ label, onClick, className }) => (
  <button className={className} onClick={() => onClick(label)}>
    {label}
  </button>
);

export default Button;
