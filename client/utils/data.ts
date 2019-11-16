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

export const user = {
  id: '1',
  firstName: 'Teemu',
  lastName: 'Taskula',
  image: 'https://placeimg.com/500/300/any',
};

export const posts = [
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
    ],
  },
];

export const messages = [
  {
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
