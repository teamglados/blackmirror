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
  cover: 'https://placeimg.com/500/200/animals',
  currentHometown: 'Helsinki',
  currentJob: 'Alepa',
  currentStudy: 'Eira’s Adult University',
  bio: 'Meatlover 🍖🥩 - vegetables are for wimps 👶🏻 Liberals are ruining our country by letting criminals in. They can go back to where they came from 👺', // prettier-ignore
  friendCount: 321,
  friendPicks: [
    { id: '1', name: 'Samuel Kirch', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' }, // prettier-ignore
    { id: '2', name: 'Jonah Gunther', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' }, // prettier-ignore
    { id: '3', name: 'Hannah Florence', avatar: 'https://randomuser.me/api/portraits/women/10.jpg' }, // prettier-ignore
    { id: '4', name: 'Fiona Jackson', avatar: 'https://randomuser.me/api/portraits/women/22.jpg' }, // prettier-ignore
    { id: '5', name: 'Arthur Ruth', avatar: 'https://randomuser.me/api/portraits/men/37.jpg' }, // prettier-ignore
    { id: '6', name: 'Daniel Grec', avatar: 'https://randomuser.me/api/portraits/men/34.jpg' }, // prettier-ignore
  ],
};

export const user: User = {
  id: '1',
  firstName: 'Teemu',
  lastName: 'Taskula',
  image: 'https://placeimg.com/500/300/tech',
};

export const posts: Post[] = [
  {
    id: '1',
    post: {
      user: {
        id: '2',
        firstName: 'Sven',
        lastName: 'Johansson',
        image: 'https://randomuser.me/api/portraits/men/14.jpg',
      },
      content: {
        text:
          'Happy to see technology advance at a great pace. Just attended a conference earlier which sparked some inspiring thoughts!',
        image: 'https://placeimg.com/500/300/tech',
        timestampMsCreated: Date.now(),
        likeCount: 12,
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
          text: 'Sounds cool Eric! Care to elaborate what you found?',
          image: 'https://placeimg.com/500/300/tech',
          timestampMsCreated: Date.now(),
          likeCount: 4,
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
          text: 'Who likes Emojis 😄💆‍♂️👻💩?',
          image: 'https://placeimg.com/500/300/tech',
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
        firstName: 'Sarah',
        lastName: 'Jefferson',
        image: 'https://randomuser.me/api/portraits/women/19.jpg',
      },
      content: {
        text:
          'Today I was feeling amused but it quickly faded when I discovered a parking ticket on my car. Oh well, guess it is my problem',
        image: 'https://placeimg.com/500/300/arch',
        timestampMsCreated: Date.now(),
        likeCount: 3,
      },
    },
    comments: [],
  },
];

const chatPartner = {
  id: '3',
  firstName: 'Markus',
  lastName: 'Mean',
  image: 'https://randomuser.me/api/portraits/men/47.jpg',
};

const chatMessages = [
  'Howdy mate!',
  'LOL I don’t care... You are a moron!',
  'You should go cry in the a dark corner 😢',
  'Hey, look it’s you <Douchebag> 🤣',
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
    image:
      i === 2
        ? 'https://live.staticflickr.com/8095/8595562397_740156c034_b.jpg'
        : null,
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
