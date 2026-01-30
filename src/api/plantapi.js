import axiosInstance from './axios';

export const plantApi = {
  createPlant: async (plantData) => {
    try {
      console.log('📤 Plant Observation Submitted');
      console.log('Plant Type:', plantData.plantType || 'Unknown');
      console.log('Category:', plantData.plantCategory || 'Unknown');
      console.log('Date:', plantData.date || 'N/A');
      console.log('Time of Day:', plantData.timeOfDay || 'N/A');
      console.log('Description:', plantData.description || 'N/A');
      console.log('Common Name:', plantData.commonName || 'Not provided');
      console.log('Scientific Name:', plantData.scientificName || 'Not provided');
      console.log('Photo Size:', plantData.photo ? JSON.stringify(plantData.photo).length : 0, 'bytes');
      
      const response = await axiosInstance.post('/plants', plantData);
      
      console.log('✅ Plant observation created successfully with ID:', response.data?._id || response.data?.id);
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

  updatePlantPhotoInfo: async (plantId, photoInfo) => {
    try {
      console.log('📤 Updating Plant Photo Information');
      console.log('Plant ID:', plantId);
      console.log('Photo Credit:', photoInfo.photoCredit || 'Not provided');
      console.log('Contact Info:', photoInfo.contactInfo || 'Not provided');
      console.log('Can Use Photo:', photoInfo.canUsePhoto);
      const response = await axiosInstance.patch(`/plants/${plantId}/photo-info`, photoInfo);
      console.log('✅ Plant photo information updated successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Update Photo Info Error:', error.response?.data || error.message);
      throw error.response?.data || {
        success: false,
        message: error.message || 'Network error'
      };
    }
  },
};

// Log to verify module is loaded
console.log('✅ plantApi module loaded successfully');