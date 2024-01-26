import axios from 'axios';

export const getGoogleSheets = async search => axios.get(`/api/google-sheets${search || ''}`);
