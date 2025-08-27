import React from 'react';
import Icon from '../../../components/AppIcon';

const SpendingInsights = ({ className = '' }) => {
  const insights = [
    {
      id: 1,
      title: 'Most Purchased Item',
      value: 'Bread (White Loaf)',
      subtitle: '24 times this year',
      icon: 'TrendingUp',
      color: 'text-primary bg-primary/10'
    },
    {
      id: 2,
      title: 'Favorite Store',
      value: 'Pick n Pay',
      subtitle: '68% of your shopping',
      icon: 'Store',
      color: 'text-secondary bg-secondary/10'
    },
    {
      id: 3,
      title: 'Average Basket Size',
      value: 'R315',
      subtitle: '12 items per trip',
      icon: 'ShoppingCart',
      color: 'text-accent bg-accent/10'
    },
    {
      id: 4,
      title: 'Total Savings',
      value: 'R2,450',
      subtitle: 'From sale alerts',
      icon: 'PiggyBank',
      color: 'text-success bg-success/10'
    },
    {
      id: 5,
      title: 'Shopping Frequency',
      value: '2.3 times/week',
      subtitle: 'Mostly weekends',
      icon: 'Calendar',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      id: 6,
      title: 'Top Category',
      value: 'Groceries',
      subtitle: '78% of spending',
      icon: 'Package',
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  const monthlyComparison = {
    thisMonth: 3850,
    lastMonth: 3200,
    change: 20.3,
    isIncrease: true
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Monthly Comparison */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Monthly Comparison</h3>
          <Icon name="BarChart3" size={20} className="text-text-secondary" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">
              R{monthlyComparison?.thisMonth?.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-secondary">
              R{monthlyComparison?.lastMonth?.toLocaleString()}
            </p>
            <p className="text-sm text-text-secondary">Last Month</p>
          </div>
        </div>
        
        <div className="flex items-center justify-center mt-4 pt-4 border-t border-border">
          <div className={`flex items-center space-x-1 ${
            monthlyComparison?.isIncrease ? 'text-error' : 'text-success'
          }`}>
            <Icon 
              name={monthlyComparison?.isIncrease ? "TrendingUp" : "TrendingDown"} 
              size={16} 
            />
            <span className="font-semibold">
              {monthlyComparison?.change}% {monthlyComparison?.isIncrease ? 'increase' : 'decrease'}
            </span>
          </div>
        </div>
      </div>
      {/* Insights Grid */}
      <div className="bg-surface rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Shopping Insights</h3>
          <Icon name="Lightbulb" size={20} className="text-text-secondary" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights?.map((insight) => (
            <div 
              key={insight?.id}
              className="p-4 rounded-lg border border-border hover:shadow-sm transition-shadow duration-200"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${insight?.color}`}>
                  <Icon name={insight?.icon} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {insight?.title}
                  </h4>
                  <p className="font-bold text-text-primary mb-1">
                    {insight?.value}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {insight?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Receipt" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">127</p>
          <p className="text-sm text-text-secondary">Total Trips</p>
        </div>
        
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Package" size={24} className="text-secondary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">1,543</p>
          <p className="text-sm text-text-secondary">Items Bought</p>
        </div>
        
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Clock" size={24} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-text-primary">18</p>
          <p className="text-sm text-text-secondary">Avg Minutes</p>
        </div>
        
        <div className="bg-surface rounded-xl border border-border p-4 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Percent" size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-text-primary">12%</p>
          <p className="text-sm text-text-secondary">Savings Rate</p>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;