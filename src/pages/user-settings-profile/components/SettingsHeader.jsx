import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SettingsHeader = ({ user, onEditProfile }) => {
  return (
    <div className="bg-white border-b border-border px-4 py-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-white flex items-center justify-center">
            <Icon name="Check" size={12} className="text-white" />
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-text-primary">
            {user?.name}
          </h1>
          <p className="text-sm text-text-secondary">
            {user?.email}
          </p>
          <p className="text-xs text-success font-medium mt-1">
            Premium Member
          </p>
        </div>
        
        <button
          onClick={onEditProfile}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Edit Profile"
        >
          <Icon name="Edit2" size={18} className="text-text-secondary" />
        </button>
      </div>
    </div>
  );
};

export default SettingsHeader;