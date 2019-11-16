import { Post, Message, User, UserDetails } from './types';

/* eslint-disable max-len */

export const categories = [
  {
    name: 'music',
    options: [
      'Electronic',
      'African',
      'Blues',
      'Reggae',
      'Ska',
      'Country',
      'Pop',
      'Rock',
      'Metal',
      'Dubstep',
      'Electro',
      'Folk',
      'Rap',
      'Hip hop',
      'Jazz',
      'R&B',
      'Soul',
    ],
  },
  {
    name: 'movie',
    options: [
      'Action',
      'Adventure',
      'Animated',
      'Biography',
      'Comedy',
      'Crime',
      'Dance',
      'Disaster',
      'Documentary',
      'Drama',
      'Erotic',
      'Family',
      'Fantasy',
      'Historical',
      'Horror',
      'Independent',
      'Legal',
      'Musical',
      'Mystery',
      'War',
    ],
  },
  {
    name: 'hobby',
    options: [
      'Cooking',
      'Cosplaying',
      'Dance',
      'Drawing',
      'Gaming',
      'Gambling',
      'Ice skating',
      'Knitting',
      'Model building',
      'Listening to music',
      'Painting',
      'Puzzles',
      'Reading',
      'Singing',
      'Sketching',
      'Sports',
      'Video gaming',
      'Watching movies',
      'Writing',
      'Yoga',
    ],
  },
];

export const userDetails: UserDetails = {
  cover: 'https://placeimg.com/500/200/any',
  currentHometown: 'Helsinki',
  currentJob: 'Alepa',
  currentStudy: 'Eira’s Adult University',
  bio: 'Burn rate partnership lean startup user experience business-to-business business model canvas accelerator equity agile development virality hackathon entrepreneur technology ramen.', // prettier-ignore
  friendCount: 321,
  friendPicks: [
    { id: '1', name: 'Jonne Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { id: '2', name: 'Arttu Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { id: '3', name: 'Kihhu Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { id: '4', name: 'Gugge Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { id: '5', name: 'Hidde Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { id: '6', name: 'Juffe Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
  ],
};

export const user: User = {
  id: '1',
  firstName: 'Teemu',
  lastName: 'Taskula',
  image: 'https://placeimg.com/500/300/any',
};

export const posts: Post[] = [
  {
    id: '1',
    post: {
      user: {
        id: '2',
        firstName: 'Volle',
        lastName: 'Fulleea',
        image: 'https://placeimg.com/500/300/any',
      },
      content: {
        text:
          'Bandwidth client business-to-business channels holy grail customer supply chain startup product management strategy stock business plan. ',
        image: 'https://placeimg.com/500/300/any',
        timestampMsCreated: Date.now(),
        likeCount: 12,
      },
    },
    comments: [
      {
        id: '1',
        user: {
          id: '3',
          firstName: 'Gollle',
          lastName: 'Fuffffuu',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text:
            'Long tail prototype network effects partner network. MVP network effects holy grail market monetization strategy hypotheses seed round burn rate influencer sales. Release niche market ecosystem startup research & development infographic responsive web design',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 12,
        },
      },
      {
        id: '2',
        user: {
          id: '8',
          firstName: 'Dudde',
          lastName: 'Lollo',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text: 'Emoji test 😄',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 1,
        },
      },
    ],
  },
];

export const messages: Message[] = [
  {
    id: '1',
    user: {
      id: '3',
      firstName: 'Gollle',
      lastName: 'Fuffffuu',
      image: 'https://placeimg.com/500/300/any',
    },
    content: {
      text:
        'Long tail prototype network effects partner network. MVP network effects holy grail market monetization strategy hypotheses seed round burn rate influencer sales. Release niche market ecosystem startup research & development infographic responsive web design',
      image: 'https://placeimg.com/500/300/any',
      timestampMsCreated: Date.now(),
      likeCount: 5,
    },
  },
  {
    id: '2',
    user: {
      id: '4',
      firstName: 'Dydde',
      lastName: 'Fussllee',
      image: 'https://placeimg.com/500/300/any',
    },
    content: {
      text:
        'Long tail prototype network effects partner network. MVP network effects holy grail market monetization strategy hypotheses seed round burn rate influencer sales. Release niche market ecosystem startup research & development infographic responsive web design',
      image: null,
      timestampMsCreated: Date.now(),
      likeCount: 3,
    },
  },
];
