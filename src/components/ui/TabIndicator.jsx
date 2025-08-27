import React from 'react';

const TabIndicator = ({ 
  isActive = false, 
  position = 'top',
  className = '',
  color = 'primary'
}) => {
  if (!isActive) return null;

  const positionClasses = {
    top: '-top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5',
    bottom: '-bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5',
    left: 'left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-8',
    right: 'right-0 top-1/2 transform -translate-y-1/2 w-0.5 h-8'
  };

  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error'
  };

  return (
    <div 
      className={`
        absolute ${positionClasses?.[position]} ${colorClasses?.[color]} 
        rounded-full transition-all duration-200 ease-out
        animate-scale-in
        ${className}
      `}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default TabIndicator;