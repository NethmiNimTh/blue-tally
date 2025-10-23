import axiosInstance from './axios';

export const animalApi = {
  // Create new animal observation
  createAnimal: async (animalData) => {
    try {
      console.log('📤 Sending animal data to backend...');
      console.log('Data size:', JSON.stringify(animalData).length, 'bytes');
      
      const response = await axiosInstance.post('/animals', animalData);
      
      console.log('✅ Animal observation created successfully');
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
};

// Log to verify module is loaded
console.log('✅ animalApi module loaded successfully');