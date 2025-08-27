import React from 'react';
import Icon from '../AppIcon';

const SyncStatusBadge = ({ 
  status = 'synced', // 'syncing', 'synced', 'error', 'offline'
  count = 0,
  className = '',
  size = 'sm'
}) => {
  const statusConfig = {
    syncing: {
      icon: 'RefreshCw',
      color: 'bg-warning text-warning-foreground',
      animation: 'animate-spin',
      label: 'Syncing...'
    },
    synced: {
      icon: 'Check',
      color: 'bg-success text-success-foreground',
      animation: '',
      label: 'Synced'
    },
    error: {
      icon: 'AlertCircle',
      color: 'bg-error text-error-foreground',
      animation: '',
      label: 'Sync error'
    },
    offline: {
      icon: 'WifiOff',
      color: 'bg-muted text-muted-foreground',
      animation: '',
      label: 'Offline'
    }
  };

  const sizeConfig = {
    xs: {
      badge: 'h-4 min-w-4 text-xs px-1',
      icon: 8,
      position: '-top-1 -right-1'
    },
    sm: {
      badge: 'h-5 min-w-5 text-xs px-1.5',
      icon: 10,
      position: '-top-2 -right-2'
    },
    md: {
      badge: 'h-6 min-w-6 text-sm px-2',
      icon: 12,
      position: '-top-2 -right-2'
    }
  };

  const config = statusConfig?.[status];
  const sizeStyles = sizeConfig?.[size];

  if (status === 'synced' && count === 0) {
    return null;
  }

  return (
    <div 
      className={`
        absolute ${sizeStyles?.position} z-[1001]
        ${sizeStyles?.badge} ${config?.color}
        rounded-full flex items-center justify-center
        font-medium shadow-soft border border-white/20
        transition-all duration-200 ease-out
        ${className}
      `}
      role="status"
      aria-label={`${config?.label}${count > 0 ? ` - ${count} items` : ''}`}
      title={`${config?.label}${count > 0 ? ` - ${count} items` : ''}`}
    >
      {count > 0 ? (
        <span className="leading-none">
          {count > 99 ? '99+' : count}
        </span>
      ) : (
        <Icon 
          name={config?.icon} 
          size={sizeStyles?.icon} 
          className={`${config?.animation} flex-shrink-0`}
        />
      )}
    </div>
  );
};

export default SyncStatusBadge;