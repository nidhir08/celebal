import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Submission() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
    return null;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Form Submitted Successfully</h2>
      <ul className="space-y-2">
        {Object.entries(state).map(([key, value]) =>
          key !== 'showPassword' && (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
