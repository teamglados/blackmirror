import axios from 'axios';

import { StartData, AppState, Post } from './types';
import * as storage from './storage';
import * as mockData from './data';
import { guid, getRandomNumberBetween } from '.';

export const API_BASE_URL =
  'http://ec2-52-49-167-129.eu-west-1.compute.amazonaws.com:5000';
export const API_URL = `${API_BASE_URL}/api`;

export function getImageUri(uri: string) {
  if (uri.includes('http')) return uri;
  if (uri.includes('public')) return `${API_BASE_URL}${uri}`;
  return `data:image/jpeg;base64,${uri}`;
}

const api = axios.create({ baseURL: API_BASE_URL });

/* eslint-disable @typescript-eslint/camelcase */

async function saveUser(data: StartData) {
  await storage.persistUser({
    id: guid(),
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.picBase64,
  });

  try {
    await storage.persistCategories(data.selectedCategories);
  } catch (error) {}

  try {
    const res1: any = await api.post(`/meme/1`, {
      image: data.picBase64,
    });

    const res2: any = await api.post(`/meme/2`, {
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

    await storage.persistMemes([meme1Post, meme2Post]);
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
  const user = await storage.getPersistedUser();
  if (!user) return null;

  const memePosts = await storage.getPersistedMemes();
  const categories = await storage.getPersistedCategories();

  return {
    user,
    categories,
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
            id: guid(),
            firstName: 'Henry',
            lastName: 'Hollington',
            image: 'https://randomuser.me/api/portraits/men/11.jpg',
          },
          content: {
            text: `Hey ${user.firstName.trim()} I heard that your favorite movie type is ${categories.movie[0].toLocaleLowerCase()}... and you listen to ${categories.music[0].toLocaleLowerCase()} music?? Really? 😂🤣`, // prettier-ignore
            image: null,
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
            text: `LOL great job ${user.firstName.trim()}, your presentation at Slush was awesome... NOT‼️ Maybe skip next year? 🚫`, // prettier-ignore
            image: null,
            timestampMsCreated: Date.now(),
            likeCount: getRandomNumberBetween(12, 45),
          },
        },
        comments: [
          {
            id: '1',
            user: {
              id: '2',
              firstName: 'Junc',
              lastName: 'Tioning',
              image: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
            content: {
              text: 'Yeah it was sooo boring... Who let them speak at Slush?!?',
              image: null,
              timestampMsCreated: Date.now(),
              likeCount: 1,
            },
          },
          {
            id: '2',
            user: {
              id: '8',
              firstName: 'Mike',
              lastName: 'Densington',
              image: 'https://randomuser.me/api/portraits/men/12.jpg',
            },
            content: {
              text:
                'I usually dont say this online but now I gotta say that it was the worst presentation I have ever seen 🙅‍♂️',
              image: null,
              timestampMsCreated: Date.now(),
              likeCount: 3,
            },
          },
        ],
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
        comments: [
          {
            id: guid(),
            user: {
              id: '2',
              firstName: 'Jessica',
              lastName: 'Almander',
              image: 'https://randomuser.me/api/portraits/women/32.jpg',
            },
            content: {
              text: 'Please tell me!!!',
              image: null,
              timestampMsCreated: Date.now(),
              likeCount: 5,
            },
          },
        ],
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
