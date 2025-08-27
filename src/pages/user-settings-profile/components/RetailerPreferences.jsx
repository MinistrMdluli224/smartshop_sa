import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RetailerPreferences = ({ preferences, onUpdatePreferences }) => {
  const retailers = [
    {
      id: 'picknpay',
      name: 'Pick n Pay',
      logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?w=40&h=40&fit=crop',
      description: 'Supermarket chain',
      locations: 12
    },
    {
      id: 'woolworths',
      name: 'Woolworths',
      logo: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?w=40&h=40&fit=crop',
      description: 'Premium retailer',
      locations: 8
    },
    {
      id: 'checkers',
      name: 'Checkers',
      logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?w=40&h=40&fit=crop',
      description: 'Hypermarket chain',
      locations: 15
    },
    {
      id: 'mrprice',
      name: 'Mr Price',
      logo: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?w=40&h=40&fit=crop',
      description: 'Fashion & home',
      locations: 6
    }
  ];

  const handleRetailerToggle = (retailerId, enabled) => {
    const updatedRetailers = enabled
      ? [...preferences?.enabledRetailers, retailerId]
      : preferences?.enabledRetailers?.filter(id => id !== retailerId);
    
    onUpdatePreferences({
      ...preferences,
      enabledRetailers: updatedRetailers
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-text-primary">Preferred Retailers</h4>
        <span className="text-xs text-text-secondary">
          {preferences?.enabledRetailers?.length} selected
        </span>
      </div>
      <div className="space-y-3">
        {retailers?.map((retailer) => {
          const isEnabled = preferences?.enabledRetailers?.includes(retailer?.id);
          
          return (
            <div key={retailer?.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={retailer?.logo}
                  alt={`${retailer?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h5 className="font-medium text-text-primary truncate">
                    {retailer?.name}
                  </h5>
                  <div className="flex items-center space-x-1 text-xs text-text-secondary">
                    <Icon name="MapPin" size={12} />
                    <span>{retailer?.locations} nearby</span>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{retailer?.description}</p>
              </div>
              <Checkbox
                checked={isEnabled}
                onChange={(e) => handleRetailerToggle(retailer?.id, e?.target?.checked)}
                aria-label={`Enable ${retailer?.name} notifications`}
              />
            </div>
          );
        })}
      </div>
      <div className="p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Location-based filtering</p>
            <p>Sale alerts will prioritize retailers within 10km of your location. You can adjust this in Privacy settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetailerPreferences;