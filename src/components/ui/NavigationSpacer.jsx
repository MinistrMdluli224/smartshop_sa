import React from 'react';

const NavigationSpacer = ({ 
  height = 80, // Default height for bottom navigation
  className = '',
  children 
}) => {
  const spacerStyle = {
    paddingBottom: `${height}px`
  };

  return (
    <div 
      className={`w-full ${className}`}
      style={spacerStyle}
    >
      {children}
    </div>
  );
};

export default NavigationSpacer;