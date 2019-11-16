import React from 'react';
import styled from 'styled-components/native';

import FeedItem from '../components/FeedItem';
import { Post } from '../utils/types';
import { useAppState } from '../utils/context';

function FeedScreen({ navigation }) {
  const { posts } = useAppState();

  function navigateToComments(post: Post) {
    navigation.navigate('FeedComments', { data: post });
  }

  return (
    <Wrapper>
      {posts.map(post => (
        <FeedItem
          key={post.id}
          data={post}
          onShowComments={() => navigateToComments(post)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
`;

export default FeedScreen;
