import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SettingsSection = ({ 
  title, 
  description, 
  icon, 
  children, 
  defaultExpanded = false,
  className = '' 
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`bg-white rounded-lg border border-border overflow-hidden ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-text-secondary">{description}</p>
            )}
          </div>
        </div>
        
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-text-secondary transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border bg-muted/20">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsSection;