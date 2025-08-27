import React from 'react';
import Icon from '../../../components/AppIcon';

const CaptureToggle = ({ activeMode, onModeChange }) => {
  const modes = [
    { id: 'manual', label: 'Manual Entry', icon: 'Edit3' },
    { id: 'voice', label: 'Voice Input', icon: 'Mic' },
    { id: 'scan', label: 'Scan Receipt', icon: 'Camera' }
  ];

  return (
    <div className="bg-muted rounded-lg p-1 flex">
      {modes?.map((mode) => (
        <button
          key={mode?.id}
          onClick={() => onModeChange(mode?.id)}
          className={`
            flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-md
            transition-all duration-200 font-medium text-xs
            ${activeMode === mode?.id 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }
          `}
        >
          <Icon name={mode?.icon} size={14} />
          {mode?.label}
        </button>
      ))}
    </div>
  );
};

export default CaptureToggle;