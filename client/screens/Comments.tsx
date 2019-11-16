import React from 'react';
import styled from 'styled-components/native';

import { FeedDataItem } from '../utils/types';
import Text from '../components/common/Text';
import CommentItem from '../components/CommentItem';

function CommentsScreen({ route }) {
  const data: FeedDataItem = route.params.data;

  return (
    <Wrapper>
      <Scroller>
        <CommentsWrapper>
          <Text size={20} weight={700}>
            Comments
          </Text>

          <Comments>
            {data.comments.map(comment => (
              <CommentItem key={comment._id} data={comment} />
            ))}
          </Comments>
        </CommentsWrapper>
      </Scroller>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Scroller = styled.ScrollView`
  flex: 1;
`;

const CommentsWrapper = styled.View`
  padding: 16px;
`;

const Comments = styled.View`
  margin-top: 24px;
`;

export default CommentsScreen;