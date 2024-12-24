import { Donor, Recipient, BloodGroup } from '../types';

const bloodGroupCompatibility: Record<BloodGroup, BloodGroup[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'],
};

export const findMatches = (recipient: Recipient, donors: Donor[]): Donor[] => {
  return donors.filter(
    (donor) =>
      donor.isAvailable &&
      donor.organs.includes(recipient.organ) &&
      bloodGroupCompatibility[donor.bloodGroup].includes(recipient.bloodGroup)
  ).sort((a, b) => a.registrationDate.getTime() - b.registrationDate.getTime());
};