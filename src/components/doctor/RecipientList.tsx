import React, { useEffect, useState } from 'react';
import { Recipient } from '../../types';
import { MatchingInterface } from './MatchingInterface';
import { Donor } from '../../types';
import { requestAccount, recipientRegistryContract } from '../../utils/contractUtils'; // Added import

interface RecipientListProps {
  donors: Donor[];
  onApproveTransplant: (recipientId: string, donorId: string) => void;
}

export const RecipientList: React.FC<RecipientListProps> = ({
  donors,
  onApproveTransplant,
}) => {
  const [recipients, setRecipients] = useState<Recipient[]>([]); // State to hold recipients
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        await requestAccount(); // Request account access
        const recipientCount = await recipientRegistryContract.getRecipientCount(); // Assuming a function to get count
        const recipientList: Recipient[] = [];

        for (let i = 0; i < recipientCount; i++) {
          const recipient = await recipientRegistryContract.recipients(i); // Assuming a function to get recipient by index
          recipientList.push(recipient);
        }

        setRecipients(recipientList);
      } catch (error) {
        console.error("Error fetching recipients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipients();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading recipients...</div>;
  }

  if (recipients.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recipients registered yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Registered Recipients</h2>
      {recipients.map((recipient) => (
        <div key={recipient.id} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{recipient.name}</h3>
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Blood Group:</span> {recipient.bloodGroup}
                </div>
                <div>
                  <span className="font-medium">Required Organ:</span> {recipient.organ}
                </div>
                <div>
                  <span className="font-medium">Urgency Level:</span>{' '}
                  <span className={`font-medium ${
                    recipient.urgencyLevel === 'Critical' ? 'text-red-600' :
                    recipient.urgencyLevel === 'High' ? 'text-orange-600' :
                    recipient.urgencyLevel === 'Medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {recipient.urgencyLevel}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Age:</span> {recipient.age}
                </div>
                <div>
                  <span className="font-medium">Contact:</span> {recipient.contact}
                </div>
                <div>
                  <span className="font-medium">Registration Date:</span>{' '}
                  {recipient.registrationDate.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <MatchingInterface
              recipient={recipient}
              donors={donors}
              onApproveTransplant={onApproveTransplant}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
