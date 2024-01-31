import axios from 'axios';

export const createJob = async data => axios.post('/api/jobs', data);
export const getJob = async id => axios.get(`/api/jobs/${id}`);
export const getJobs = async search => axios.get(`/api/jobs${search || ''}`);
export const updateJob = async (id, data) => axios.patch(`/api/jobs/${id}`, data);
