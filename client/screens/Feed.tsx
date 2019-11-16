import React from 'react';
import styled from 'styled-components/native';

import { sleep } from '../utils';
import FeedItem from '../components/FeedItem';
import { FeedDataItem } from '../utils/types';

const mockData: FeedDataItem[] = [
  {
    _id: 1,
    createdAt: new Date().toISOString(),
    image: 'https://placeimg.com/500/300/any',
    text: 'Vesting period handshake user experience infrastructure startup. Android crowdsource return on investment. Lean startup research & development business-to-consumer success startup low hanging fruit. Business plan success supply chain.', // prettier-ignore
    likeCount: 123,
    comments: [
      {
        _id: 1,
        createdAt: new Date().toISOString(),
        text: 'Jotain tosi kivaa!',
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Jokuvaan',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        createdAt: new Date().toISOString(),
        text: 'Early adopters strategy founders user experience creative. Validation business model canvas entrepreneur success ownership return on investment gamification churn rate scrum project channels pitch monetization client strategy.', // prettier-ignore
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Hummo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        createdAt: new Date().toISOString(),
        text: 'Business-to-business metrics hackathon MVP. Business-to-business sales learning curve market.', // prettier-ignore
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Mummo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 4,
        createdAt: new Date().toISOString(),
        text: 'Business-to-business metrics hackathon MVP. Business-to-business sales learning curve market.', // prettier-ignore
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Mummo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 5,
        createdAt: new Date().toISOString(),
        text: 'Business-to-business metrics hackathon MVP. Business-to-business sales learning curve market.', // prettier-ignore
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Mummo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 6,
        createdAt: new Date().toISOString(),
        text: 'Business-to-business metrics hackathon MVP. Business-to-business sales learning curve market.', // prettier-ignore
        likeCount: 2,
        user: {
          _id: 9,
          name: 'Mummo',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ],
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

function FeedScreen({ navigation }) {
  const [feedData, setFeedData] = React.useState<FeedDataItem[]>([]);

  function navigateToComments(feedItem: FeedDataItem) {
    navigation.navigate('FeedComments', { data: feedItem });
  }

  React.useEffect(() => {
    async function loadData() {
      await sleep(1000);
      setFeedData(mockData);
    }

    loadData();
  }, []);

  return (
    <Wrapper>
      {feedData.map(feedItem => (
        <FeedItem
          key={feedItem._id}
          data={feedItem}
          onShowComments={() => navigateToComments(feedItem)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export default FeedScreen;
