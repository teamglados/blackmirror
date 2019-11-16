import React from 'react';
import styled from 'styled-components/native';

import { Post } from '../utils/types';
import Text from './common/Text';
import FeedItem from './FeedItem';
import Divider from './common/Divider';

interface Props {
  data: Post[];
  navigation: any;
}

function ProfileFeed({ data, navigation }: Props) {
  function navigateToComments(post: Post) {
    navigation.navigate('ProfileComments', { data: post });
  }

  return (
    <Wrapper>
      <Header>
        <Text size={20} weight={700}>
          Feed
        </Text>
      </Header>

      <Feed>
        {data.map((post, index) => (
          <FeedItemWrapper key={post.id}>
            <FeedItem
              key={post.id}
              data={post}
              onShowComments={() => navigateToComments(post)}
            />
            {index < data.length - 1 && <Divider />}
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
