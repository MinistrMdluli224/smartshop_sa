import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      path: '/home-dashboard',
      label: 'Home',
      icon: 'Home',
      tooltip: 'Dashboard and active lists'
    },
    {
      path: '/smart-item-capture',
      label: 'Add Item',
      icon: 'Plus',
      tooltip: 'Capture items with camera'
    },
    {
      path: '/sale-alerts-deals',
      label: 'Sales',
      icon: 'Tag',
      tooltip: 'Discover deals and alerts'
    },
    {
      path: '/shopping-history',
      label: 'History',
      icon: 'Clock',
      tooltip: 'View shopping history'
    },
    {
      path: '/user-settings-profile',
      label: 'Settings',
      icon: 'Settings',
      tooltip: 'Profile and preferences'
    }
  ];

  const handleTabClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-[1000] ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {navigationItems?.map((item) => {
          const active = isActive(item?.path);
          
          return (
            <button
              key={item?.path}
              onClick={() => handleTabClick(item?.path)}
              className={`
                flex flex-col items-center justify-center min-h-[44px] px-3 py-2 rounded-lg
                transition-all duration-200 ease-out
                ${active 
                  ? 'text-primary bg-primary/10 scale-105' :'text-text-secondary hover:text-primary hover:bg-muted'
                }
                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2
                active:scale-95
              `}
              aria-label={item?.tooltip}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 transition-colors duration-200 ${
                  active ? 'text-primary' : 'text-current'
                }`}
              />
              <span className={`
                text-xs font-medium tracking-wide leading-none
                ${active ? 'text-primary' : 'text-current'}
              `}>
                {item?.label}
              </span>
              {active && (
                <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;