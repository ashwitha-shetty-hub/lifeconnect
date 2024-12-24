import React, { useState } from 'react';
import { Recipient, BloodGroup, OrganType, UrgencyLevel } from '../../types';
import { validateRecipient } from '../../utils/validation';

interface RecipientFormProps {
  onSubmit: (recipient: Recipient) => void;
}

export const RecipientForm: React.FC<RecipientFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Recipient>>({});
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateRecipient(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      id: crypto.randomUUID(),
      registrationDate: new Date(),
    } as Recipient);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800">Register New Recipient</h2>
      
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-600 p-4 rounded">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Blood Group</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value as BloodGroup })}
          >
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Required Organ</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, organ: e.target.value as OrganType })}
          >
            <option value="">Select Organ</option>
            {['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas'].map((organ) => (
              <option key={organ} value={organ}>{organ}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value as UrgencyLevel })}
          >
            <option value="">Select Urgency Level</option>
            {['Critical', 'High', 'Medium', 'Low'].map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register Recipient
        </button>
      </div>
    </form>
  );
};