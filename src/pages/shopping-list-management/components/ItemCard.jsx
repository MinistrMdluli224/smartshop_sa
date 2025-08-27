import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ItemCard = ({ item, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item?.name);
  const [editPrice, setEditPrice] = useState(item?.price?.toString());
  const [showActions, setShowActions] = useState(false);

  const handleSave = () => {
    onUpdate(item?.id, {
      name: editName,
      price: parseFloat(editPrice) || 0
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(item?.name);
    setEditPrice(item?.price?.toString());
    setIsEditing(false);
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(1, item?.quantity + delta);
    onUpdate(item?.id, { quantity: newQuantity });
  };

  const itemTotal = item?.price * item?.quantity;

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Item name"
          />
          <input
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e?.target?.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Price (R)"
            step="0.01"
            min="0"
          />
          <div className="flex space-x-2">
            <Button variant="default" onClick={handleSave} className="flex-1">
              Save
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 ${
        item?.completed ? 'opacity-60' : ''
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(item?.id)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
              item?.completed 
                ? 'bg-emerald-500 border-emerald-500 text-white' :'border-gray-300 hover:border-emerald-500'
            }`}
          >
            {item?.completed && <Icon name="Check" size={12} />}
          </button>
          
          <div className="flex-1">
            <h4 className={`font-medium ${item?.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {item?.name}
            </h4>
            <p className="text-sm text-gray-500">
              R{item?.price?.toFixed(2)} each • Total: R{itemTotal?.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors duration-200"
              disabled={item?.quantity <= 1}
            >
              <Icon name="Minus" size={16} />
            </button>
            <span className="w-8 text-center font-medium">{item?.quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>

          {(showActions || window.innerWidth < 768) && (
            <div className="flex space-x-1">
              <button
                onClick={() => setIsEditing(true)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 transition-colors duration-200"
              >
                <Icon name="Edit2" size={16} />
              </button>
              <button
                onClick={() => onDelete(item?.id)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <Icon name="Trash2" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;