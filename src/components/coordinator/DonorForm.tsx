import React, { useState } from 'react';
import { Donor, BloodGroup, OrganType } from '../../types';
import { validateDonor } from '../../utils/validation';
import { requestAccount, donorRegistryContract } from '../../utils/contractUtils'; // Added import

interface DonorFormProps {
  onSubmit: (donor: Donor) => void;
}

export const DonorForm: React.FC<DonorFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<Donor>>({
    organs: [],
    isAvailable: true,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateDonor(formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Request account access
    await requestAccount();

    // Send transaction to register donor
    try {
      const tx = await donorRegistryContract.registerDonor({
        ...formData,
        id: crypto.randomUUID(),
        registrationDate: new Date(),
        isAvailable: true,
      });
      await tx.wait(); // Wait for the transaction to be mined
      onSubmit({
        ...formData,
        id: crypto.randomUUID(),
        registrationDate: new Date(),
        isAvailable: true,
      } as Donor);
    } catch (error) {
      console.error("Error registering donor:", error);
      setErrors(["Failed to register donor. Please try again."]);
    }
  };

  const handleOrganChange = (organ: OrganType) => {
    const organs = formData.organs || [];
    const updatedOrgans = organs.includes(organ)
      ? organs.filter(o => o !== organ)
      : [...organs, organ];
    setFormData({ ...formData, organs: updatedOrgans });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800">Register New Donor</h2>
      
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

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Organs</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Heart', 'Kidney', 'Liver', 'Lungs', 'Pancreas'].map((organ) => (
              <label key={organ} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  onChange={() => handleOrganChange(organ as OrganType)}
                  checked={formData.organs?.includes(organ as OrganType)}
                />
                <span>{organ}</span>
              </label>
            ))}
          </div>
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
          Register Donor
        </button>
      </div>
    </form>
  );
};
