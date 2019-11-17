import axios from 'axios';
import { StartData, User, AppState } from './types';
import { persistUser, getPersistUser } from './storage';
import * as mockData from './data';
import { sleep } from '.';

const api = axios.create({ baseURL: '' });

/* eslint-disable @typescript-eslint/camelcase */

async function saveUser(data: StartData) {
  const payload = {
    first_name: data.firstName,
    last_name: data.lastName,
    keywords: data.selectedCategories,
    image: data.picBase64,
  };

  await persistUser(data);
  // await axios.post(`/user`, payload);
}

async function getUserData() {
  const user = await getPersistUser();
  if (!user) return null;

  const data: AppState = {
    user: mockData.user,
    messages: mockData.messages,
    posts: mockData.posts,
  };

  await sleep(2000);

  return data;
}

export default {
  saveUser,
  getUserData,
};
