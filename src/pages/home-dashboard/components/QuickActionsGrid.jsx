import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionsGrid = ({ className = '' }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'new-list',
      title: 'New List',
      description: 'Start fresh shopping list',
      icon: 'Plus',
      color: 'bg-primary text-primary-foreground',
      action: () => navigate('/shopping-list-management?action=new')
    },
    {
      id: 'scan-receipt',
      title: 'Scan Receipt',
      description: 'Add items from receipt',
      icon: 'Camera',
      color: 'bg-secondary text-secondary-foreground',
      action: () => navigate('/smart-item-capture?mode=receipt')
    },
    {
      id: 'browse-templates',
      title: 'Templates',
      description: 'Use saved templates',
      icon: 'BookOpen',
      color: 'bg-accent text-accent-foreground',
      action: () => navigate('/shopping-list-management?view=templates')
    }
  ];

  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-card-foreground">
          Quick Actions
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={action?.action}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-full ${action?.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon 
                  name={action?.icon} 
                  size={24} 
                  className="text-current" 
                />
              </div>
              
              <div>
                <h3 className="font-semibold text-card-foreground mb-1">
                  {action?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;