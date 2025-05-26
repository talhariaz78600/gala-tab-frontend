// components/Common/ErrorMessage.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4">
    <div className="flex items-center">
      <FaExclamationTriangle className="text-red-500 mr-2" />
      <span className="text-red-700">{message}</span>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Retry
      </button>
    )}
  </div>
);

export default ErrorMessage;