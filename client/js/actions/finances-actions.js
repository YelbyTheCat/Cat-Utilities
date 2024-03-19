import axios from 'axios';

const address = '/api/finances';

export const createFinance = async data => axios.post(address, data);
export const getFinance = async id => axios.get(`${address}/${id}`);
export const getFinances = async search => axios.get(`${address}${search || ''}`);
export const updateFinance = async (id, data) => axios.patch(`${address}/${id}`, data);
export const deleteFinance = async id => axios.delete(`${address}/${id}`);
