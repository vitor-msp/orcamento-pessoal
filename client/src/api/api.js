import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

axios.create({
  baseURL: `http://localhost:${process.env.PORT}/` || `http://localhost:3000/`,
  headers: {
    'Content-type': 'application/json',
  },
});

//get by period
export async function getByPeriod(period) {
  const res = await axios.get(`/api/transaction?period=${period}`);
  return res.data;
}

//post
export async function post(transaction) {
  const res = await axios.post(`/api/transaction`, transaction);
  return res.data;
}

//update
export async function update(transaction) {
  const res = await axios.put(`/api/transaction`, transaction);
  return res;
}

//delete
export async function remove(id) {
  const res = await axios.delete(`/api/transaction/${id}`);
  return res.data;
}
