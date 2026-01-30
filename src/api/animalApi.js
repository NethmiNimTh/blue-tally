import axiosInstance from './axios';

export const animalApi = {
  // Create new animal observation
  createAnimal: async (animalData) => {
    try {
      console.log('📤 Animal Observation Submitted');
      console.log('Animal Type:', animalData.animalType || 'Unknown');
      console.log('Category:', animalData.category || 'Unknown');
      console.log('Date:', animalData.date || 'N/A');
      console.log('Time of Day:', animalData.timeOfDay || 'N/A');
      console.log('Description:', animalData.description || 'N/A');
      console.log('Common Name:', animalData.commonName || 'Not provided');
      console.log('Scientific Name:', animalData.scientificName || 'Not provided');
      console.log('Photo Size:', animalData.photo ? JSON.stringify(animalData.photo).length : 0, 'bytes');
      
      const response = await axiosInstance.post('/animals', animalData);
      
      console.log('✅ Animal observation created successfully with ID:', response.data?._id || response.data?.id);
      return response.data;
    } catch (error) {
      console.error('❌ Animal API Error:', error.response?.data || error.message);
      throw error.response?.data || { 
        success: false, 
        message: error.message || 'Network error' 
      };
    }
  },

  // Get all animal observations
  getAllAnimals: async () => {
    try {
      const response = await axiosInstance.get('/animals');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get animal by ID
  getAnimalById: async (id) => {
    try {
      const response = await axiosInstance.get(`/animals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get animals by type
  getAnimalsByType: async (type) => {
    try {
      const response = await axiosInstance.get(`/animals/type/${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Get animal statistics
  getAnimalStats: async () => {
    try {
      const response = await axiosInstance.get('/animals/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  // Update animal photo information
  updateAnimalPhotoInfo: async (animalId, photoInfo) => {
    try {
      console.log('📤 Updating Animal Photo Information');
      console.log('Animal ID:', animalId);
      console.log('Photo Credit:', photoInfo.photoCredit || 'Not provided');
      console.log('Contact Info:', photoInfo.contactInfo || 'Not provided');
      console.log('Can Use Photo:', photoInfo.canUsePhoto);
      const response = await axiosInstance.patch(`/animals/${animalId}/photo-info`, photoInfo);
      console.log('✅ Animal photo information updated successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Update Animal Photo Info Error:', error.response?.data || error.message);
      throw error.response?.data || {
        success: false,
        message: error.message || 'Network error'
      };
    }
  },
};

// Log to verify module is loaded
console.log('✅ animalApi module loaded successfully');