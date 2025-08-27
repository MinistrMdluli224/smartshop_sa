import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ className = '' }) => {
  const navigate = useNavigate();

  const recentActivities = [
    {
      id: 1,
      type: 'shopping_completed',
      title: 'Weekly Groceries',
      description: 'Completed shopping at Pick n Pay',
      amount: 847.50,
      itemCount: 23,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      retailer: 'Pick n Pay',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'list_created',
      title: 'Weekend Braai List',
      description: 'New shopping list created',
      amount: 0,
      itemCount: 8,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      retailer: null,
      icon: 'Plus',
      iconColor: 'text-primary'
    },
    {
      id: 3,
      type: 'shopping_completed',
      title: 'Household Essentials',
      description: 'Completed shopping at Checkers',
      amount: 234.99,
      itemCount: 12,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      retailer: 'Checkers',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    },
    {
      id: 4,
      type: 'deal_saved',
      title: 'Great Deal Found!',
      description: 'Saved R45.00 on cleaning supplies',
      amount: 45.00,
      itemCount: 0,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      retailer: 'Woolworths',
      icon: 'Tag',
      iconColor: 'text-accent'
    },
    {
      id: 5,
      type: 'shopping_completed',
      title: 'Monthly Bulk Shopping',
      description: 'Completed shopping at Makro',
      amount: 1247.80,
      itemCount: 35,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      retailer: 'Makro',
      icon: 'CheckCircle',
      iconColor: 'text-success'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date?.toLocaleDateString('en-ZA');
  };

  const handleViewHistory = () => {
    navigate('/shopping-history');
  };

  const handleActivityClick = (activity) => {
    if (activity?.type === 'shopping_completed') {
      navigate(`/shopping-history?session=${activity?.id}`);
    } else if (activity?.type === 'list_created') {
      navigate('/shopping-list-management');
    } else if (activity?.type === 'deal_saved') {
      navigate('/sale-alerts-deals');
    }
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-card-foreground">
            Recent Activity
          </h2>
        </div>
        <Button
          variant="ghost"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={handleViewHistory}
          className="text-primary hover:text-primary/80"
        >
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {recentActivities?.slice(0, 4)?.map((activity) => (
          <div
            key={activity?.id}
            onClick={() => handleActivityClick(activity)}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={activity?.icon} 
                  size={18} 
                  className={activity?.iconColor} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-card-foreground mb-1">
                      {activity?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {activity?.description}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatDate(activity?.date)}</span>
                      {activity?.retailer && (
                        <span className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{activity?.retailer}</span>
                        </span>
                      )}
                      {activity?.itemCount > 0 && (
                        <span className="flex items-center space-x-1">
                          <Icon name="Package" size={12} />
                          <span>{activity?.itemCount} items</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {activity?.amount > 0 && (
                    <div className="text-right flex-shrink-0 ml-4">
                      <div className={`font-semibold ${
                        activity?.type === 'deal_saved' ?'text-success' :'text-card-foreground'
                      }`}>
                        {activity?.type === 'deal_saved' ? '+' : ''}{formatCurrency(activity?.amount)}
                      </div>
                      {activity?.type === 'deal_saved' && (
                        <div className="text-xs text-muted-foreground">
                          saved
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;