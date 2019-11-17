import axios from 'axios';
import toCamelCase from 'camelcase-keys';

import { StartData, AppState, Post } from './types';
import {
  persistUser,
  getPersistedUser,
  persistMemes,
  getPersistedMemes,
} from './storage';
import * as mockData from './data';
import { guid, getRandomNumberBetween } from '.';

export const API_BASE_URL =
  'http://ec2-63-35-251-51.eu-west-1.compute.amazonaws.com:5000';
export const API_URL = `${API_BASE_URL}/api`;

export function getImageUri(uri: string) {
  if (uri.includes('http')) return uri;
  if (uri.includes('public')) return `${API_BASE_URL}${uri}`;
  return `data:image/jpeg;base64,${uri}`;
}

const api = axios.create({ baseURL: API_BASE_URL });

/* eslint-disable @typescript-eslint/camelcase */

async function saveUser(data: StartData) {
  await persistUser({
    id: guid(),
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.picBase64,
  });

  try {
    const res1: any = await api.post(`/meme`, {
      image: data.picBase64,
    });

    const res2: any = await api.post(`/meme`, {
      image: data.picBase64,
    });

    const meme1Post: Post = {
      comments: [],
      id: guid(),
      post: {
        content: {
          image: res1.data.url,
          likeCount: 127,
          text: 'Look at this moron! 😛',
          timestampMsCreated: Date.now(),
        },
        user: {
          id: guid(),
          firstName: 'Max',
          lastName: 'Johnny',
          image: 'https://randomuser.me/api/portraits/men/34.jpg',
        },
      },
    };

    const meme2Post: Post = {
      comments: [],
      id: guid(),
      post: {
        content: {
          image: res2.data.url,
          likeCount: 18,
          text: 'Another idiot face XD',
          timestampMsCreated: Date.now(),
        },
        user: {
          id: guid(),
          firstName: 'Adrian',
          lastName: 'Bender',
          image: 'https://randomuser.me/api/portraits/men/31.jpg',
        },
      },
    };

    await persistMemes([meme1Post, meme2Post]);
  } catch (error) {}

  // const response: any = await api.post(`/api/users`, {image });
  // const payload = {
  //   first_name: data.firstName,
  //   last_name: data.lastName,
  //   keywords: data.selectedCategories,
  //   image: data.picBase64,
  // };

  // const response: any = await api.post(`/api/users`, payload);
  // const user: any = toCamelCase(
  //   {
  //     ...response.data,
  //     image: response.data.image.replace('/app', ''),
  //   },
  //   { deep: true }
  // );

  // await persistUser(user);
}

async function getAppData() {
  const user = await getPersistedUser();
  if (!user) return null;

  const memePosts = await getPersistedMemes();

  return {
    user,
    posts: [
      {
        id: guid(),
        post: {
          user: {
            id: guid(),
            firstName: 'Michaela',
            lastName: 'Gunner',
            image: 'https://randomuser.me/api/portraits/women/29.jpg',
          },
          content: {
            text: 'It pretty good weather today 🌞 think I am gonna go outside and take a nice long walk', // prettier-ignore
            image: 'https://placeimg.com/500/300/nature',
            timestampMsCreated: Date.now(),
            likeCount: getRandomNumberBetween(12, 45),
          },
        },
        comments: [],
      },
      {
        id: guid(),
        post: {
          user: {
            id: '2',
            firstName: 'Eric',
            lastName: 'Ericsson',
            image: 'https://randomuser.me/api/portraits/men/29.jpg',
          },
          content: {
            text: `Hey ${user.firstName}! Heard you're a jackass. Wanna comment on it?`, // prettier-ignore
            image: null,
            timestampMsCreated: Date.now(),
            likeCount: getRandomNumberBetween(12, 45),
          },
        },
        comments: [],
      },
      ...mockData.posts,
      {
        id: guid(),
        post: {
          user: {
            id: '2',
            firstName: 'Hans',
            lastName: 'Gustavson',
            image: 'https://randomuser.me/api/portraits/men/19.jpg',
          },
          content: {
            text: `Lol yeah. Just found out something...I have some information about ${user.firstName} ${user.lastName} 😏 will announce soon so stay tuned!`, // prettier-ignore
            image: null,
            timestampMsCreated: Date.now(),
            likeCount: getRandomNumberBetween(3, 15),
          },
        },
        comments: [],
      },
      ...memePosts,
    ],
    messages: mockData.messages,
    hasNotifications: false,
  } as AppState;

  // try {
  //   const response: any = await api.get(`/api/feed/${user.id}`);
  //   const posts: Post[] = response.data.map(d =>
  //     toCamelCase(d, { deep: true })
  //   );
  //   console.log('> posts', posts[0]);
  //   return {
  //     user,
  //     posts,
  //     messages: mockData.messages,
  //     hasNotifications: false,
  //   } as AppState;
  // } catch (error) {
  //   return {
  //     user: mockData.user,
  //     posts: mockData.posts,
  //     messages: mockData.messages,
  //     hasNotifications: false,
  //   } as AppState;
  // }
}

export default {
  saveUser,
  getAppData,
};
