import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ onRefresh, children, threshold = 80 }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canPull, setCanPull] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setCanPull(true);
      startY.current = e?.touches?.[0]?.clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (!canPull || isRefreshing) return;

    currentY.current = e?.touches?.[0]?.clientY;
    const distance = Math.max(0, currentY?.current - startY?.current);
    
    if (distance > 0 && window.scrollY === 0) {
      e?.preventDefault();
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  };

  const handleTouchEnd = async () => {
    if (!canPull || isRefreshing) return;

    if (pullDistance >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }

    setPullDistance(0);
    setCanPull(false);
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    container?.addEventListener('touchstart', handleTouchStart, { passive: false });
    container?.addEventListener('touchmove', handleTouchMove, { passive: false });
    container?.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [canPull, pullDistance, threshold, isRefreshing]);

  const refreshProgress = Math.min(pullDistance / threshold, 1);
  const showRefreshIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div ref={containerRef} className="relative">
      {/* Pull to refresh indicator */}
      {showRefreshIndicator && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-primary/10 transition-all duration-200 ease-out z-10"
          style={{ 
            height: `${Math.max(pullDistance * 0.8, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(-${isRefreshing ? 0 : Math.max(0, 60 - pullDistance * 0.8)}px)`
          }}
        >
          <div className="flex items-center gap-2 text-primary">
            <Icon 
              name="RefreshCw" 
              size={20} 
              className={`transition-transform duration-200 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              style={{
                transform: `rotate(${refreshProgress * 360}deg)`
              }}
            />
            <span className="text-sm font-medium">
              {isRefreshing 
                ? 'Refreshing deals...' 
                : pullDistance >= threshold 
                  ? 'Release to refresh' :'Pull to refresh'
              }
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className="transition-transform duration-200 ease-out"
        style={{ 
          transform: `translateY(${pullDistance * 0.5}px)` 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;