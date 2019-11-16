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
    commentCount: 12,
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

function FeedScreen() {
  const [feedData, setFeedData] = React.useState<FeedDataItem[]>([]);

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
        <FeedItem key={feedItem._id} data={feedItem} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export default FeedScreen;
