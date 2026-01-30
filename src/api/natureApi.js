import axiosInstance from './axios';

export const natureApi = {
  createNature: async (natureData) => {
    try {
      console.log('📤 Nature Observation Submitted');
      console.log('Nature Type:', natureData.natureType || 'Unknown');
      console.log('Category:', natureData.category || 'Unknown');
      console.log('Date:', natureData.date || 'N/A');
      console.log('Time of Day:', natureData.timeOfDay || 'N/A');
      console.log('Description:', natureData.description || 'N/A');
      console.log('Common Name:', natureData.commonName || 'Not provided');
      console.log('Scientific Name:', natureData.scientificName || 'Not provided');
      console.log('Photo Size:', natureData.photo ? JSON.stringify(natureData.photo).length : 0, 'bytes');
      
      const response = await axiosInstance.post('/nature', natureData);
      
      console.log('✅ Nature observation created successfully with ID:', response.data?._id || response.data?.id);
      return response.data;
    } catch (error) {
      console.error('❌ Nature API Error:', error.response?.data || error.message);
      throw error.response?.data || { 
        success: false, 
        message: error.message || 'Network error' 
      };
    }
  },

  getAllNature: async () => {
    try {
      const response = await axiosInstance.get('/nature');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  getNatureById: async (id) => {
    try {
      const response = await axiosInstance.get(`/nature/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: error.message };
    }
  },

  updateNaturePhotoInfo: async (natureId, photoInfo) => {
    try {
      console.log('📤 Updating Nature Photo Information');
      console.log('Nature ID:', natureId);
      console.log('Photo Credit:', photoInfo.photoCredit || 'Not provided');
      console.log('Contact Info:', photoInfo.contactInfo || 'Not provided');
      console.log('Can Use Photo:', photoInfo.canUsePhoto);
      const response = await axiosInstance.patch(`/nature/${natureId}/photo-info`, photoInfo);
      console.log('✅ Nature photo information updated successfully');
      return response.data;
    } catch (error) {
      console.error('❌ Update Nature Photo Info Error:', error.response?.data || error.message);
      throw error.response?.data || {
        success: false,
        message: error.message || 'Network error'
      };
    }
  },
};

console.log('✅ natureApi module loaded successfully');