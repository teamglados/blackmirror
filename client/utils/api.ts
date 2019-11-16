import axios from 'axios';
import { StartData } from './types';
import { sleep } from './index';

const api = axios.create({ baseURL: '' });

async function saveUser(data: StartData) {
  await sleep(5000);
  const formData = new FormData();
  const name = `${data.firstName}_${data.lastName}_profile.jpg`;

  formData.append('name', name);
  formData.append('photo', {
    uri: data.picUri,
    type: 'image/jpeg',
    name,
  } as any);

  return axios
    .post(`/upload`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .catch(error => {
      throw error;
    });
}

export default {
  saveUser,
};
