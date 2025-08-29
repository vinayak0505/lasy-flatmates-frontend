export type FlatStatus = 'Available' | 'Available Soon' | 'Rented' | 'Maintenance';

export type FlatSize = '1BHK' | '2BHK' | '3BHK' | '4BHK';

export interface FlatLocation {
  address: string;
  googleMapsUrl: string;
}

export interface FlatPreferences {
  foodType: 'Veg' | 'Non-Veg' | 'Both';
  alcoholAllowed: boolean;
  smokingAllowed: boolean;
  hasPets: boolean;
  petsAllowed: boolean;
  femaleOnly: boolean;
  dedicatedBathroom: boolean;
}

export interface FlatCost {
  monthlyRent: number;
  maintenanceCharges: number;
  brokerage: number;
  securityDeposit: number;
  otherOneTimeCharges: number;
}

export interface Flat {
  id: string;
  images: string[];
  size: FlatSize;
  location: FlatLocation;
  costs: FlatCost;
  status: FlatStatus;
  availableFrom: string;
  preferences: FlatPreferences;
}

export interface FlatsTableProps {
  flats?: Flat[];
  onSelectionChange?: (selectedIds: string[]) => void;
  initialSelectedIds?: string[];
}