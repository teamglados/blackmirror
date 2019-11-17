import { Post, Message, User, UserDetails } from './types';
import { getRandomNumberBetween, guid } from '.';

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
        firstName: 'Eric',
        lastName: 'Ericsson',
        image: 'https://placeimg.com/500/300/any',
      },
      content: {
        text: 'Have you guys seen this amazing thing!',
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
          firstName: 'Andreas',
          lastName: 'Urbanski',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text:
            'Long tail prototype network effects partner network. MVP network effects holy grail market monetization strategy hypotheses seed round burn rate influencer sales. Release niche market ecosystem startup research & development infographic responsive web design',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 45,
        },
      },
      {
        id: '2',
        user: {
          id: '8',
          firstName: 'Ville',
          lastName: 'Toiviainen',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text: 'Who likes Emojis 😄💆‍♂️👻💩?',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 1,
        },
      },
    ],
  },
  {
    id: '2',
    post: {
      user: {
        id: '2',
        firstName: 'Junc',
        lastName: 'Tioning',
        image: 'https://placeimg.com/500/300/any',
      },
      content: {
        text: 'It was such a hard thing to hack two days straight 😭😴',
        image: 'https://placeimg.com/500/300/any',
        timestampMsCreated: Date.now(),
        likeCount: 4,
      },
    },
    comments: [
      {
        id: '1',
        user: {
          id: '3',
          firstName: 'John',
          lastName: 'Doe',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text:
            'Long tail prototype network effects partner network. MVP network effects holy grail market monetization strategy hypotheses seed round burn rate influencer sales. Release niche market ecosystem startup research & development infographic responsive web design',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 16,
        },
      },
      {
        id: '2',
        user: {
          id: '8',
          firstName: 'Andreas',
          lastName: 'Urbanski',
          image: 'https://placeimg.com/500/300/any',
        },
        content: {
          text: 'What a weird comment 😄',
          image: 'https://placeimg.com/500/300/any',
          timestampMsCreated: Date.now(),
          likeCount: 1,
        },
      },
    ],
  },
  {
    id: '3',
    post: {
      user: {
        id: '2',
        firstName: 'Ville',
        lastName: 'Toiviainen',
        image: 'https://placeimg.com/500/300/any',
      },
      content: {
        text: 'I like turtles 🐢',
        image: 'https://placeimg.com/500/300/any',
        timestampMsCreated: Date.now(),
        likeCount: 281,
      },
    },
    comments: [],
  },
];

const chatPartner = {
  id: '3',
  firstName: 'Markus',
  lastName: 'Mean',
  image: 'https://placeimg.com/500/300/any',
};

const chatMessages = [
  'Howdy mate!',
  'LOL I don’t care... You are a moron!',
  'You should go cry in the a dark corner 😢',
  'Hey, look it’s you <some douchebag> 🤣',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
  'Shut up‼',
];

export const messages: Message[] = chatMessages.map((message, i) => ({
  id: guid(),
  user: chatPartner,
  content: {
    text: message,
    image: i === 2 ? 'https://placeimg.com/500/300/any' : null,
    timestampMsCreated: Date.now(),
    likeCount: getRandomNumberBetween(0, 30),
  },
}));

export const getMeanUser = (user: User) => {
  return {
    ...user,
    lastName: `"Douche" ${user.lastName}`,
  };
};

export const getMeanPosts = (user: User) => {
  const texts = [
    'you said you loved me, i sneezed and said sorry, im allergic to bullshit',
    'Im Not Racist I Just Dont Like You !',
    'stupidity is an idiots defence to life',
    "hey here's a condom , wouldn't want you making the same mistake your mom did!",
    'I was always told "If you have nothing NICE to say don\'t say anything at all." People wonder why I\'m so quiet. I HAVE NOTHING NICE TO SAY!',
    "My momma told me I don't have to be nice to stupid people.",
    'If stupid were a seed, this place would be an orchard',
    "Life's a Bitch. But so am I so its all good :)",
    'when people put you down, get back up and push them down, kick dirt in there face and run away laughing... ha ha ha ha ha',
    'Is it funny or mean to stop at a hitch hiker, ask if they wants a ride, then if they says yes, tell them : HOPE YA FIND ONE SOON, as you speed off.?',
  ];

  return texts.map((text, index) => ({
    id: `${index}`,
    post: {
      user: getMeanUser(user),
      content: {
        text,
        image: null,
        timestampMsCreated: Date.now(),
        likeCount: getRandomNumberBetween(0, 53),
      },
    },
    comments: [],
  }));
};
