import React from 'react';
import styled from 'styled-components/native';

import { ProfileData } from '../utils/types';
import Text from './common/Text';
import FeedItem from './FeedItem';
import Divider from './common/Divider';

interface Props {
  data: ProfileData;
}

function ProfileFeed({ data }: Props) {
  return (
    <Wrapper>
      <Header>
        <Text size={20} weight={700}>
          Feed
        </Text>
      </Header>

      <Feed>
        {data.feed.map((feedItem, index) => (
          <FeedItemWrapper key={feedItem._id}>
            <FeedItem key={feedItem._id} data={feedItem} />
            {index < data.feed.length - 1 && <Divider />}
          </FeedItemWrapper>
        ))}
      </Feed>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

const Header = styled.View`
  padding: 16px;
`;

const Feed = styled.View``;

const FeedItemWrapper = styled.View``;

export default ProfileFeed;
