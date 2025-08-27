import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, onAddToList, onSetAlert }) => {
  if (!recommendations || recommendations?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-accent" />
        <h2 className="text-lg font-semibold text-card-foreground">
          Recommended for You
        </h2>
      </div>
      <div className="space-y-3">
        {recommendations?.map((item) => (
          <div 
            key={item?.id}
            className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg border border-accent/20"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={item?.image}
                alt={item?.productName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-card-foreground text-sm line-clamp-1 mb-1">
                    {item?.productName}
                  </h3>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-success">
                      R{item?.salePrice?.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      R{item?.originalPrice?.toFixed(2)}
                    </span>
                    <span className="text-xs bg-success text-success-foreground px-1.5 py-0.5 rounded">
                      -{Math.round(((item?.originalPrice - item?.salePrice) / item?.originalPrice) * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Store" size={12} />
                    <span className="capitalize">
                      {item?.retailer?.replace(/([A-Z])/g, ' $1')?.trim()}
                    </span>
                    {item?.reason && (
                      <>
                        <span>•</span>
                        <span className="text-accent font-medium">{item?.reason}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-1 ml-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Plus"
                    onClick={() => onAddToList(item)}
                    className="h-8 w-8 p-0"
                    title="Add to list"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Bell"
                    onClick={() => onSetAlert(item)}
                    className="h-8 w-8 p-0"
                    title="Set alert"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Based on your shopping history and current lists
        </p>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;