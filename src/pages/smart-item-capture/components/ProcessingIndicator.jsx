import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingIndicator = ({ 
  isVisible = false, 
  stage = 'analyzing', 
  progress = 0,
  message = ''
}) => {
  if (!isVisible) return null;

  const stages = {
    analyzing: {
      icon: 'Scan',
      title: 'Analyzing Image',
      description: 'Processing receipt image...'
    },
    detecting: {
      icon: 'Search',
      title: 'Detecting Text',
      description: 'Finding items and prices...'
    },
    extracting: {
      icon: 'FileText',
      title: 'Extracting Data',
      description: 'Reading item information...'
    },
    completing: {
      icon: 'CheckCircle',
      title: 'Almost Done',
      description: 'Finalizing results...'
    }
  };

  const currentStage = stages?.[stage] || stages?.analyzing;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-sm text-center space-y-4">
        {/* Animated Icon */}
        <div className="relative">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon 
              name={currentStage?.icon} 
              size={24} 
              className="text-primary animate-pulse" 
            />
          </div>
          
          {/* Progress Ring */}
          <div className="absolute inset-0 w-16 h-16 mx-auto">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                className="text-primary transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Status Text */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {currentStage?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {message || currentStage?.description}
          </p>
          
          {progress > 0 && (
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>{progress}%</span>
              <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Offline Indicator */}
        {!navigator.onLine && (
          <div className="flex items-center justify-center gap-2 text-xs text-warning bg-warning/10 rounded-lg p-2">
            <Icon name="WifiOff" size={12} />
            <span>Processing offline - will sync when connected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingIndicator;