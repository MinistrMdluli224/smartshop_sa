import React from 'react';
import DealCard from './DealCard';
import Icon from '../../../components/AppIcon';

const DealsGrid = ({ 
  deals, 
  loading, 
  onAddToList, 
  onSetAlert, 
  onRefresh,
  hasMore,
  onLoadMore 
}) => {
  if (loading && deals?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Icon name="RefreshCw" size={32} className="text-muted-foreground animate-spin mb-4" />
        <p className="text-muted-foreground">Loading deals...</p>
      </div>
    );
  }

  if (!loading && deals?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Icon name="Tag" size={48} className="text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-card-foreground mb-2">
          No deals found
        </h3>
        <p className="text-muted-foreground text-center mb-4">
          Try adjusting your filters or search terms
        </p>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
        >
          <Icon name="RefreshCw" size={16} />
          <span>Refresh deals</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop grid layout */}
      <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {deals?.map((deal) => (
          <DealCard
            key={deal?.id}
            deal={deal}
            onAddToList={onAddToList}
            onSetAlert={onSetAlert}
          />
        ))}
      </div>
      {/* Tablet grid layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-4 lg:hidden">
        {deals?.map((deal) => (
          <DealCard
            key={deal?.id}
            deal={deal}
            onAddToList={onAddToList}
            onSetAlert={onSetAlert}
          />
        ))}
      </div>
      {/* Mobile single column layout */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {deals?.map((deal) => (
          <DealCard
            key={deal?.id}
            deal={deal}
            onAddToList={onAddToList}
            onSetAlert={onSetAlert}
          />
        ))}
      </div>
      {/* Load more button */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Icon name="ChevronDown" size={16} />
                <span>Load More Deals</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default DealsGrid;