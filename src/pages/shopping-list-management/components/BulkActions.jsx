import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedItems, 
  onClearSelection, 
  onDeleteSelected, 
  onMarkCompleted,
  onMarkIncomplete 
}) => {
  const selectedCount = selectedItems?.length;

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">
          {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
        </span>
        <button
          onClick={onClearSelection}
          className="text-gray-400 hover:text-gray-600"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkCompleted}
          iconName="Check"
          iconPosition="left"
          className="flex-1"
        >
          Complete
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkIncomplete}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1"
        >
          Undo
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          onClick={onDeleteSelected}
          iconName="Trash2"
          iconPosition="left"
          className="flex-1"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default BulkActions;