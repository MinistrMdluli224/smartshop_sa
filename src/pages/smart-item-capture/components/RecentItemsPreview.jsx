import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RecentItemsPreview = ({ items = [], onUndo, onViewList }) => {
  if (items?.length === 0) {
    return null;
  }

  const totalValue = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
          <Icon name="ShoppingCart" size={16} />
          Recently Added ({items?.length})
        </h3>
        <div className="text-sm font-semibold text-foreground">
          R{totalValue?.toFixed(2)}
        </div>
      </div>
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {items?.slice(-3)?.reverse()?.map((item, index) => (
          <div key={item?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Icon 
                    name={
                      item?.category === 'groceries' ? 'ShoppingBasket' :
                      item?.category === 'clothes' ? 'Shirt' :
                      item?.category === 'household' ? 'Home' : 'Package'
                    } 
                    size={14} 
                    className="text-muted-foreground" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item?.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Qty: {item?.quantity}</span>
                    <span>•</span>
                    <span className="font-medium">R{(item?.price * item?.quantity)?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onUndo(item?.id)}
              iconName="Undo2"
              className="text-muted-foreground hover:text-foreground"
            >
              Undo
            </Button>
          </div>
        ))}
      </div>
      {items?.length > 3 && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            +{items?.length - 3} more items in your list
          </p>
        </div>
      )}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          onClick={() => {
            // Add another item functionality
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          iconName="Plus"
          iconPosition="left"
          className="flex-1"
        >
          Add Another
        </Button>
        <Button
          variant="default"
          onClick={onViewList}
          iconName="List"
          iconPosition="left"
          className="flex-1"
        >
          View List
        </Button>
      </div>
    </div>
  );
};

export default RecentItemsPreview;