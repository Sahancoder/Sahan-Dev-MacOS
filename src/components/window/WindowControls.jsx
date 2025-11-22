import React from 'react';

const WindowControls = ({ onClose, onMinimize }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
      />
      <button
        onClick={(e) => { e.stopPropagation(); onMinimize(); }}
        className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-sm"
      />
      <button
        className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-sm"
      />
    </div>
  );
};

export default WindowControls;

