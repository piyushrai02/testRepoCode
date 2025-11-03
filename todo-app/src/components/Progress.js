import React from 'react';

const Progress = ({ completed, total }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
};

export default Progress;
