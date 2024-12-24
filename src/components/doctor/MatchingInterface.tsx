import React from 'react';
import { Recipient, Donor } from '../../types';
import { findMatches } from '../../utils/matching';
import { CheckCircle, XCircle } from 'lucide-react';

interface MatchingInterfaceProps {
  recipient: Recipient;
  donors: Donor[];
  onApproveTransplant: (recipientId: string, donorId: string) => void;
}

export const MatchingInterface: React.FC<MatchingInterfaceProps> = ({
  recipient,
  donors,
  onApproveTransplant,
}) => {
  const matches = findMatches(recipient, donors);

  if (matches.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-yellow-700">No matching donors found for this recipient.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Potential Donor Matches</h3>
      <div className="grid gap-4">
        {matches.map((donor) => (
          <div key={donor.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">{donor.name}</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Blood Group:</span> {donor.bloodGroup}
                  </div>
                  <div>
                    <span className="font-medium">Age:</span> {donor.age}
                  </div>
                  <div>
                    <span className="font-medium">Available Organs:</span>{' '}
                    {donor.organs.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Contact:</span> {donor.contact}
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onApproveTransplant(recipient.id, donor.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Match
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};