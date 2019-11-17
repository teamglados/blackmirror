import axios from 'axios';
import toCamelCase from 'camelcase-keys';

import { StartData, AppState } from './types';
import { persistUser, getPersistUser } from './storage';
import * as mockData from './data';

export const API_BASE_URL = 'http://6ed88a54.eu.ngrok.io';
export const API_URL = `${API_BASE_URL}/api`;

const api = axios.create({ baseURL: API_URL });

/* eslint-disable @typescript-eslint/camelcase */

async function saveUser(data: StartData) {
  const payload = {
    first_name: data.firstName,
    last_name: data.lastName,
    keywords: data.selectedCategories,
    image: data.picBase64,
  };

  const response: any = await api.post(`/users`, payload);
  const user: any = toCamelCase({
    ...response.data,
    image: response.data.image.replace('/app', ''),
  });

  await persistUser(user);
}

async function fetchUserData() {
  const user = await getPersistUser();
  if (!user) return null;

  const data: AppState = {
    user,
    messages: mockData.messages,
    posts: mockData.posts,
    hasNotifications: false,
  };

  return data;
}

export default {
  saveUser,
  getUserData: fetchUserData,
};
