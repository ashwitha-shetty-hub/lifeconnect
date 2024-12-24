import { Recipient, Donor } from '../types';

export const validateRecipient = (data: Partial<Recipient>): string[] => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.bloodGroup) errors.push('Blood group is required');
  if (!data.organ) errors.push('Organ type is required');
  if (!data.age || data.age < 0) errors.push('Valid age is required');
  if (!data.contact?.trim()) errors.push('Contact information is required');
  if (!data.urgencyLevel) errors.push('Urgency level is required');
  
  return errors;
};

export const validateDonor = (data: Partial<Donor>): string[] => {
  const errors: string[] = [];
  
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.bloodGroup) errors.push('Blood group is required');
  if (!data.organs?.length) errors.push('At least one organ must be selected');
  if (!data.age || data.age < 0) errors.push('Valid age is required');
  if (!data.contact?.trim()) errors.push('Contact information is required');
  
  return errors;
};