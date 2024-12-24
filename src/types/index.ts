export interface Recipient {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  organ: OrganType;
  registrationDate: Date;
  urgencyLevel: UrgencyLevel;
  age: number;
  contact: string;
}

export interface Donor {
  id: string;
  name: string;
  bloodGroup: BloodGroup;
  organs: OrganType[];
  registrationDate: Date;
  age: number;
  contact: string;
  isAvailable: boolean;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type OrganType = 'Heart' | 'Kidney' | 'Liver' | 'Lungs' | 'Pancreas';
export type UrgencyLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type UserRole = 'Doctor' | 'Coordinator' | 'Admin';