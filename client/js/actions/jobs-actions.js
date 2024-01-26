import axios from 'axios';

export const getJobs = async search => axios.get(`/api/jobs${search || ''}`);
