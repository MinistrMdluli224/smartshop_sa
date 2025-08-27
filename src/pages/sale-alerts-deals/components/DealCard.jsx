import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DealCard = ({ deal, onAddToList, onSetAlert }) => {
  const calculateSavings = (original, sale) => {
    const savings = original - sale;
    const percentage = Math.round((savings / original) * 100);
    return { amount: savings, percentage };
  };

  const savings = calculateSavings(deal?.originalPrice, deal?.salePrice);
  const isExpiringSoon = new Date(deal.validUntil) <= new Date(Date.now() + 24 * 60 * 60 * 1000);

  const retailerColors = {
    'picknpay': 'border-red-500 bg-red-50',
    'woolworths': 'border-green-600 bg-green-50',
    'checkers': 'border-blue-600 bg-blue-50',
    'mrprice': 'border-orange-500 bg-orange-50'
  };

  return (
    <div className={`
      bg-card rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200
      ${retailerColors?.[deal?.retailer] || 'border-border bg-card'}
    `}>
      {/* Header with retailer and discount badge */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <Icon name="Store" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground capitalize">
            {deal?.retailer?.replace(/([A-Z])/g, ' $1')?.trim()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isExpiringSoon && (
            <span className="text-xs bg-warning text-warning-foreground px-2 py-1 rounded-full">
              Expires Soon
            </span>
          )}
          <span className="text-sm font-bold bg-success text-success-foreground px-2 py-1 rounded-full">
            -{savings?.percentage}%
          </span>
        </div>
      </div>
      {/* Product image and details */}
      <div className="px-4 pb-3">
        <div className="flex gap-3">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={deal?.image}
              alt={deal?.productName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-card-foreground text-sm leading-tight mb-1 line-clamp-2">
              {deal?.productName}
            </h3>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
              {deal?.category}
            </p>
            
            {/* Price section */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-success">
                R{deal?.salePrice?.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                R{deal?.originalPrice?.toFixed(2)}
              </span>
            </div>
            
            <div className="text-xs text-success font-medium">
              Save R{savings?.amount?.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      {/* Validity and location */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            <span>Valid until {new Date(deal.validUntil)?.toLocaleDateString('en-ZA')}</span>
          </div>
          {deal?.location && (
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={12} />
              <span>{deal?.location}</span>
            </div>
          )}
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onAddToList(deal)}
          className="flex-1"
        >
          Add to List
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Bell"
          iconPosition="left"
          onClick={() => onSetAlert(deal)}
          className="flex-1"
        >
          Set Alert
        </Button>
      </div>
    </div>
  );
};

export default DealCard;