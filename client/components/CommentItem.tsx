import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

import { Comment } from '../utils/types';
import Text from './common/Text';
import Spacing from './common/Spacing';
import theme from '../constants/theme';

interface Props {
  data: Comment;
}

function CommentItem({ data }: Props) {
  return (
    <Wrapper>
      <Avatar>
        <AvatarImage source={{ uri: data.user.image }} resizeMode="cover" />
      </Avatar>

      <CommentDetails>
        <CommentBubbleWrapper>
          <CommentBubble>
            <Text size={14} weight={500}>
              {data.user.firstName} {data.user.lastName}
            </Text>

            <Spacing amount={4} vertical />

            <Text>{data.content.text}</Text>

            {data.content.likeCount > 0 && (
              <LikeCount>
                <LikeIconWrapper>
                  <AntDesign name="like1" size={10} color="#fff" />
                </LikeIconWrapper>
                <Text color={theme.grey.dark2} size={12}>
                  {data.content.likeCount}
                </Text>
              </LikeCount>
            )}
          </CommentBubble>
        </CommentBubbleWrapper>

        <CommentDate>
          <Text size={12} color={theme.grey.dark1}>
            {moment(data.content.timestampMsCreated).fromNow()}
          </Text>
        </CommentDate>
      </CommentDetails>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;

const Avatar = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 99px;
  overflow: hidden;
`;

const AvatarImage = styled.Image`
  width: 40px;
  height: 40px;
`;

const CommentBubbleWrapper = styled.View`
  flex-grow: 0;
  flex-direction: row;
`;

const CommentBubble = styled.View`
  border-radius: 16px;
  background-color: ${props => props.theme.grey.light3};
  padding: 10px 12px;
  margin-bottom: 4px;
  position: relative;
`;

const CommentDetails = styled.View`
  flex: 1;
`;

const CommentDate = styled.View`
  padding-left: 12px;
`;

const LikeCount = styled.View`
  position: absolute;
  right: -10px;
  bottom: -4px;
  background-color: #fff;
  border-radius: 99px;
  flex-direction: row;
  align-items: center;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 1px 4px 1px 1px;
`;

const LikeIconWrapper = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.primary.base};
  margin-right: 2px;
  justify-content: center;
  align-items: center;
`;

export default CommentItem;
