import React from 'react';
import { UserRole } from '../../types';
import { UserCircle2, UserCog, Stethoscope } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onRoleSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Organ Donation Management System
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              role: 'Doctor' as UserRole,
              icon: Stethoscope,
              description: 'Register recipients and manage organ matches',
            },
            {
              role: 'Coordinator' as UserRole,
              icon: UserCircle2,
              description: 'Register and manage organ donors',
            },
            {
              role: 'Admin' as UserRole,
              icon: UserCog,
              description: 'System administration and activity monitoring',
            },
          ].map(({ role, icon: Icon, description }) => (
            <button
              key={role}
              onClick={() => onRoleSelect(role)}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <Icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{role}</h2>
              <p className="text-gray-600">{description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};