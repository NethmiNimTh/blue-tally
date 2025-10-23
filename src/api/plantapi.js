import axiosInstance from './axios';

export const plantApi = {
  createPlant: async (plantData) => {
    try {
      console.log('📤 Sending plant data to backend...');
      console.log('Data size:', JSON.stringify(plantData).length, 'bytes');
      
      const response = await axiosInstance.post('/plants', plantData);
      
      console.log('✅ Plant created successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Plant API Error:', error.response?.data || error.message);
      throw error.response?.data || { 
        success: false, 
        message: error.message || 'Network error' 
      };
    }
  },

  getAllPlants: async () => {
    try {
      const response = await axiosInstance.get('/plants');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },
};

// Log to verify module is loaded
console.log('✅ plantApi module loaded successfully');