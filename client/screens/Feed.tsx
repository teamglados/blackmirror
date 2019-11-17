import React from 'react';
import styled from 'styled-components/native';

import FeedItem from '../components/FeedItem';
import { Post } from '../utils/types';
import { useAppState, useAppDispatch } from '../utils/context';
import Divider from '../components/common/Divider';

function FeedScreen({ navigation }) {
  const { posts } = useAppState();
  const dispatch = useAppDispatch();

  function navigateToComments(post: Post) {
    navigation.navigate('FeedComments', { data: post });
  }

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     dispatch({ type: 'set-notifications' });
  //   }, 2000);
  // }, [dispatch]);

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
