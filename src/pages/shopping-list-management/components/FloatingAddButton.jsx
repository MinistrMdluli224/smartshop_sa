import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FloatingAddButton = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate('/smart-item-capture');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
      aria-label="Add new item"
    >
      <Icon name="Plus" size={24} />
    </button>
  );
};

export default FloatingAddButton;