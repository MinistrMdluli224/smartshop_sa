import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import SyncStatusBadge from '../../../components/ui/SyncStatusBadge';

const ListHeader = ({ 
  listName, 
  totalItems, 
  totalCost, 
  syncStatus = 'synced',
  onEditName,
  onBack 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/home-dashboard');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Icon name="ArrowLeft" size={20} />
          </button>
          
          <div className="relative">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{listName}</h1>
              <p className="text-sm text-gray-500">
                {totalItems} items • R{totalCost?.toFixed(2)}
              </p>
            </div>
            <SyncStatusBadge status={syncStatus} size="sm" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onEditName}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Edit list name"
          >
            <Icon name="Edit2" size={20} />
          </button>
          
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListHeader;