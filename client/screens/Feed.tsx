import React from 'react';
import styled from 'styled-components/native';

import FeedItem from '../components/FeedItem';
import { Post } from '../utils/types';
import { useAppState } from '../utils/context';
import Divider from '../components/common/Divider';

function FeedScreen({ navigation }) {
  const { posts } = useAppState();

  function navigateToComments(post: Post) {
    navigation.navigate('FeedComments', { data: post });
  }

  return (
    <Wrapper>
      <Scroller>
        {posts.map((post, index) => (
          <FeedItemWrapper key={post.id}>
            <FeedItem
              data={post}
              onShowComments={() => navigateToComments(post)}
            />
            {index < posts.length - 1 && <Divider />}
          </FeedItemWrapper>
        ))}
      </Scroller>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

const Scroller = styled.ScrollView`
  flex: 1;
`;

const FeedItemWrapper = styled.View``;

export default FeedScreen;
