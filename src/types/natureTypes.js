export interface NatureObservation {
  _id: string;
  category: string;
  natureType: 'Natural events' | 'Aesthetics' | 'Other';
  photo: string;
  date: string;
  timeOfDay: 'Morning' | 'Noon' | 'Evening' | 'Night';
  description?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  status?: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface CreateNatureRequest {
  natureType: 'Natural events' | 'Aesthetics' | 'Other';
  photo: string;
  date: string;
  timeOfDay: 'Morning' | 'Noon' | 'Evening' | 'Night';
  description?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}