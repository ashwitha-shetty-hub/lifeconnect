import React, { useState } from 'react';
import { RoleSelection } from './components/auth/RoleSelection';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { DonorForm } from './components/coordinator/DonorForm';
import { UserRole, Recipient, Donor } from './types';
import { LogOut } from 'lucide-react';
import { findMatches } from './utils/matching';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [donors, setDonors] = useState<Donor[]>([]);

  const handleRecipientSubmit = (recipient: Recipient) => {
    setRecipients([...recipients, recipient]);
  };

  const handleDonorSubmit = (donor: Donor) => {
    setDonors([...donors, donor]);
    // Check for matches with existing recipients
    recipients.forEach(recipient => {
      const matches = findMatches(recipient, [donor]);
      if (matches.length > 0) {
        alert(`New donor matches with recipient ${recipient.name}!`);
      }
    });
  };

  const handleApproveTransplant = (recipientId: string, donorId: string) => {
    // Update recipient and donor lists
    setRecipients(recipients.filter(r => r.id !== recipientId));
    setDonors(donors.map(d => 
      d.id === donorId ? { ...d, isAvailable: false } : d
    ));
    
    // Get the recipient and donor details for the alert
    const recipient = recipients.find(r => r.id === recipientId);
    const donor = donors.find(d => d.id === donorId);
    
    alert(`Transplant approved!\nRecipient: ${recipient?.name}\nDonor: ${donor?.name}`);
  };

  const handleLogout = () => {
    setCurrentRole(null);
  };

  if (!currentRole) {
    return <RoleSelection onRoleSelect={setCurrentRole} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Organ Donation Management System - {currentRole} Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'Doctor' && (
          <DoctorDashboard
            recipients={recipients}
            donors={donors}
            onRecipientSubmit={handleRecipientSubmit}
            onApproveTransplant={handleApproveTransplant}
          />
        )}
        {currentRole === 'Coordinator' && (
          <DonorForm onSubmit={handleDonorSubmit} />
        )}
        {currentRole === 'Admin' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">System Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800">Total Recipients</h3>
                <p className="text-3xl font-bold text-blue-600">{recipients.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800">Total Donors</h3>
                <p className="text-3xl font-bold text-green-600">{donors.length}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800">Active Users</h3>
                <p className="text-3xl font-bold text-purple-600">1</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;