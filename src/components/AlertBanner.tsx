import React from 'react';

interface AlertBannerProps {
  type: 'warning' | 'error' | 'success' | 'info';
  title: string;
  message: string;
  onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({ type, title, message, onDismiss }) => {
  const styles = {
    warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
    error: 'bg-red-50 border-red-400 text-red-800',
    success: 'bg-green-50 border-green-400 text-green-800',
    info: 'bg-blue-50 border-blue-400 text-blue-800',
  };

  const icons = {
    warning: '⚠️',
    error: '❌',
    success: '✅',
    info: 'ℹ️',
  };

  return (
    <div className={`${styles[type]} border-l-4 p-4 rounded-md shadow-sm`} role="alert">
      <div className="flex items-start">
        <div className="flex-shrink-0 text-2xl mr-3">
          {icons[type]}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
