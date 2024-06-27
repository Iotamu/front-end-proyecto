import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/admin';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSchedule = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/schedule`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserSchedule = async (userId: string, scheduleData: any) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/schedule`, scheduleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
