import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoryCard = ({ session, onShopAgain, onShare, onAddToTemplate, className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-ZA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-ZA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Groceries': 'bg-emerald-100 text-emerald-700',
      'Clothes': 'bg-purple-100 text-purple-700',
      'Household': 'bg-blue-100 text-blue-700',
      'Other': 'bg-gray-100 text-gray-700'
    };
    return colors?.[category] || colors?.['Other'];
  };

  const getStoreIcon = (store) => {
    const storeIcons = {
      'Pick n Pay': 'ShoppingCart',
      'Woolworths': 'Store',
      'Checkers': 'ShoppingBag',
      'Mr Price': 'Tag',
      'Spaza Shop': 'Home'
    };
    return storeIcons?.[store] || 'Store';
  };

  return (
    <div className={`bg-surface rounded-xl border border-border overflow-hidden ${className}`}>
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-muted/50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={getStoreIcon(session?.store)} 
                size={20} 
                className="text-primary"
              />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">{session?.store}</h3>
              <p className="text-sm text-text-secondary">
                {formatDate(session?.date)} • {formatTime(session?.date)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-text-primary">R{session?.total?.toLocaleString()}</p>
            <p className="text-sm text-text-secondary">{session?.itemCount} items</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-2">
            {session?.hasSavings && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="TrendingDown" size={12} className="mr-1" />
                R{session?.savings} saved
              </span>
            )}
            {session?.paymentMethod && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-text-secondary">
                <Icon name="CreditCard" size={12} className="mr-1" />
                {session?.paymentMethod}
              </span>
            )}
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary"
          />
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-3">
            <h4 className="font-medium text-text-primary mb-3">Items Purchased</h4>
            {session?.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={14} className="text-text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{item?.name}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(item?.category)}`}>
                        {item?.category}
                      </span>
                      {item?.quantity > 1 && (
                        <span className="text-xs text-text-secondary">
                          Qty: {item?.quantity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-text-primary">R{item?.price?.toFixed(2)}</p>
                  {item?.originalPrice && item?.originalPrice > item?.price && (
                    <p className="text-xs text-text-secondary line-through">
                      R{item?.originalPrice?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-4 bg-muted/30 border-t border-border">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => onShopAgain(session)}
                className="flex-1 min-w-0"
              >
                Shop Again
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                iconPosition="left"
                onClick={() => onShare(session)}
                className="flex-1 min-w-0"
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Bookmark"
                iconPosition="left"
                onClick={() => onAddToTemplate(session)}
                className="flex-1 min-w-0"
              >
                Save Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;