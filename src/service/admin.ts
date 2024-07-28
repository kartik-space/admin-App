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
  } catch (error : any) {
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

export const getAmbulanceOrders = async () => {
  try {
    const response = await apiClient.get('/admin/ambulance-orders');
    return response.data;
  } catch (error : any) {
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
  } catch (error : any) {
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
  } catch (error : any) {
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
  } catch (error  :any) {
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
  } catch (error : any) {
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

export interface UpdateRateParams {
  carType: string;
  perKilometerRate: number;
}

export const updateRate = async (params: UpdateRateParams): Promise<any> => {
  try {
    const response = await axios.patch(`/admin/update-rates`, params);
    return response.data;
  } catch (error: any) {
    console.error('Error updating rate:', error.response || error.message);
    throw new Error(error.response?.data?.message || 'Server Error');
  }
};

