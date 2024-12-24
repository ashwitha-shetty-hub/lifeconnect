import React from 'react';
import { RecipientForm } from './RecipientForm';
import { RecipientList } from './RecipientList';
import { Recipient, Donor } from '../../types';

interface DoctorDashboardProps {
  recipients: Recipient[];
  donors: Donor[];
  onRecipientSubmit: (recipient: Recipient) => void;
  onApproveTransplant: (recipientId: string, donorId: string) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  recipients,
  donors,
  onRecipientSubmit,
  onApproveTransplant,
}) => {
  return (
    <div className="space-y-8">
      <RecipientForm onSubmit={onRecipientSubmit} />
      <RecipientList
        recipients={recipients}
        donors={donors}
        onApproveTransplant={onApproveTransplant}
      />
    </div>
  );
};