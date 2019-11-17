import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import { Post, Comment } from '../utils/types';
import Text from '../components/common/Text';
import CommentItem from '../components/CommentItem';
import FeedItem from '../components/FeedItem';
import { noop, guid } from '../utils';
import CommentInput from '../components/CommentInput';
import { useAppState } from '../utils/context';

function CommentsScreen({ route }) {
  const data: Post = route.params.data;
  const { user } = useAppState();
  const [localComments, setLocalComments] = React.useState(data.comments);

  function handleCommentAdd(text: string) {
    const newComment: Comment = {
      id: guid(),
      content: {
        text,
        image: null,
        likeCount: 0,
        timestampMsCreated: Date.now(),
      },
      user,
    };
    setLocalComments(prev => [...prev, newComment]);
  }

  // Sync comments
  React.useEffect(() => {
    if (data.comments.length > localComments.length) {
      setLocalComments(data.comments);
    }
  }, [localComments, data.comments]);

  return (
    <Wrapper>
      <Scroller>
        <FeedItem data={data} onShowComments={noop} disableComments />

        <CommentsWrapper>
          <Text size={20} weight={700}>
            Comments
          </Text>

          <Comments>
            {localComments.map(comment => (
              <CommentItem key={comment.id} data={comment} />
            ))}
          </Comments>
        </CommentsWrapper>

        <InputOffset />
      </Scroller>

      <CommentInputWrapper>
        <CommentInput onAdd={handleCommentAdd} />
      </CommentInputWrapper>
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

const InputOffset = styled.View`
  height: 60px;
`;

const CommentInputWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-color: ${props => props.theme.grey.base};
  border-top-width: ${StyleSheet.hairlineWidth}px;
`;

export default CommentsScreen;
