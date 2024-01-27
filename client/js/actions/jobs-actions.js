import axios from 'axios';

export const getJobs = async search => axios.get(`/api/jobs${search || ''}`);
export const getJob = async id => axios.get(`/api/jobs/${id}`);
