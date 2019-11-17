import axios from 'axios';
import toCamelCase from 'camelcase-keys';

import { StartData, AppState, Post } from './types';
import { persistUser, getPersistUser } from './storage';
import * as mockData from './data';

export const API_BASE_URL =
  'http://ec2-63-35-251-51.eu-west-1.compute.amazonaws.com:5000';
export const API_URL = `${API_BASE_URL}/api`;

export function getImageUri(uri: string) {
  return uri.includes('/upload') ? `${API_BASE_URL}${uri}` : uri;
}

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
  const user: any = toCamelCase(
    {
      ...response.data,
      image: response.data.image.replace('/app', ''),
    },
    { deep: true }
  );

  await persistUser(user);
}

async function fetchUserData() {
  const user = await getPersistUser();
  if (!user) return null;

  try {
    const response: any = await api.get(`/feed/${user.id}`);
    const posts: Post[] = response.data.map(d =>
      toCamelCase(d, { deep: true })
    );
    console.log('> posts', posts[0]);
    return {
      user,
      posts,
      messages: mockData.messages,
      hasNotifications: false,
    } as AppState;
  } catch (error) {
    return {
      user: mockData.user,
      posts: mockData.posts,
      messages: mockData.messages,
      hasNotifications: false,
    } as AppState;
  }
}

export default {
  saveUser,
  getUserData: fetchUserData,
};
