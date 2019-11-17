import React from 'react';
import styled from 'styled-components/native';

import FeedItem from '../components/FeedItem';
import { Post } from '../utils/types';
import { useAppState, useAppDispatch } from '../utils/context';
import Divider from '../components/common/Divider';
import { WINDOW_HEIGHT } from '../constants/display';

function FeedScreen({ navigation }) {
  const [notificationTriggered, setNotificationTriggered] = React.useState(false); // prettier-ignore
  const { posts } = useAppState();
  const dispatch = useAppDispatch();

  function navigateToComments(post: Post) {
    navigation.navigate('FeedComments', { data: post });
  }

  function handleScroll({ nativeEvent: { contentOffset } }) {
    if (notificationTriggered) return;

    if (contentOffset.y > WINDOW_HEIGHT * 1.5) {
      dispatch({ type: 'set-notifications' });
      setNotificationTriggered(true);
    }
  }

  return (
    <Wrapper>
      <Scroller onScroll={handleScroll} scrollEventThrottle={200}>
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
