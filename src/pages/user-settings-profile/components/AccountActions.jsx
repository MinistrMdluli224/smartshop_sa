import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountActions = ({ onAction }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const actions = [
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download your shopping lists and history',
      icon: 'Download',
      variant: 'outline',
      action: () => onAction('export')
    },
    {
      id: 'privacy',
      label: 'Privacy Policy',
      description: 'View our privacy policy and terms',
      icon: 'Shield',
      variant: 'outline',
      action: () => onAction('privacy')
    },
    {
      id: 'support',
      label: 'Contact Support',
      description: 'Get help with your account',
      icon: 'MessageCircle',
      variant: 'outline',
      action: () => onAction('support')
    },
    {
      id: 'logout',
      label: 'Sign Out',
      description: 'Sign out of your account',
      icon: 'LogOut',
      variant: 'secondary',
      action: () => onAction('logout')
    }
  ];

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      onAction('delete');
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-text-primary">Account Actions</h4>
      <div className="space-y-3">
        {actions?.map((action) => (
          <div key={action?.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Icon name={action?.icon} size={18} className="text-text-secondary" />
              </div>
              <div>
                <h5 className="font-medium text-text-primary">{action?.label}</h5>
                <p className="text-sm text-text-secondary">{action?.description}</p>
              </div>
            </div>
            
            <Button
              variant={action?.variant}
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={action?.action}
            >
              {action?.id === 'logout' ? 'Sign Out' : 'Open'}
            </Button>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-border">
        <div className="p-4 bg-error/5 border border-error/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h5 className="font-medium text-error mb-2">Danger Zone</h5>
              <p className="text-sm text-text-secondary mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              
              {showDeleteConfirm && (
                <div className="mb-4 p-3 bg-error/10 rounded-lg">
                  <p className="text-sm text-error font-medium mb-2">
                    Are you absolutely sure?
                  </p>
                  <p className="text-xs text-text-secondary">
                    This will permanently delete your account, shopping lists, history, and all associated data. This action cannot be undone.
                  </p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  iconName={showDeleteConfirm ? "Trash2" : "AlertTriangle"}
                  onClick={handleDeleteAccount}
                >
                  {showDeleteConfirm ? 'Yes, Delete Account' : 'Delete Account'}
                </Button>
                
                {showDeleteConfirm && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountActions;