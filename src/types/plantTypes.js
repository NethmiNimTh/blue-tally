export interface PlantObservation {
  _id: string;
  category: string;
  plantCategory: 'Terrestrial' | 'Aquatic';
  plantType: string;
  photo: string;
  date: string;
  timeOfDay: 'Morning' | 'Noon' | 'Evening' | 'Night';
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlantRequest {
  plantCategory: 'Terrestrial' | 'Aquatic';
  plantType: string;
  photo: string;
  date: string;
  timeOfDay: 'Morning' | 'Noon' | 'Evening' | 'Night';
  description?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  error?: string;
}