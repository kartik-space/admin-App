import axios from 'axios';


// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://agobackend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCabOrders = async () => {
  try {
    const response = await apiClient.get('/admin/cab-orders');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error; 
  }
};

export const HomeCardOrders = async () => {
  try {
    const response = await apiClient.get('/admin/');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error; 
  }
};

export const getAvailableDrivers = async () => {
  try {
    const response = await apiClient.get('/admin/drivers-available');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};

export const allotDriver = async (driverId: string, cabOrderId: string) => {
  try {
    const response = await apiClient.post('/admin/drivers-allot', {
      driverId,
      cabOrderId,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
}

export const getAllDrivers = async () => {
  try {
    const response = await apiClient.get('/admin/drivers');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};

