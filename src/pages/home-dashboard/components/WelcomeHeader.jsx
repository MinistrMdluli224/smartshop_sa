import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeHeader = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('smartshop_language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    
    if (currentLanguage === 'zu') {
      if (hour < 12) return 'Sawubona ekuseni';
      if (hour < 17) return 'Sawubona emini';
      return 'Sawubona kusihlwa';
    }
    
    // English greetings
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    // Mock user data - in real app this would come from auth context
    return currentLanguage === 'zu' ? 'Sipho' : 'Sarah';
  };

  const getWelcomeText = () => {
    return currentLanguage === 'zu' ?'Wamkelekile ku-SmartShop SA' :'Welcome to SmartShop SA';
  };

  return (
    <div className={`bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {getGreeting()}, {getUserName()}!
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                {getWelcomeText()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-primary-foreground/80">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>
                {currentTime?.toLocaleDateString('en-ZA', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>South Africa</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Icon 
              name="Bell" 
              size={24} 
              className="text-primary-foreground hover:text-primary-foreground/80 cursor-pointer transition-colors" 
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary"></div>
          </div>
          
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;