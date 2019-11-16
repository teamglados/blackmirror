import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Feather } from '@expo/vector-icons';

import { FeedDataItem } from '../utils/types';

interface Props {
  data: FeedDataItem;
}

function FeedItemHeader({ data }: Props) {
  return (
    <Wrapper>
      <Avatar>
        <AvatarImage source={{ uri: data.user.avatar }} resizeMode="cover" />
      </Avatar>

      <HeaderDetails>
        <UserName>{data.user.name}</UserName>
        <ItemDate>{moment(data.createdAt).fromNow()}</ItemDate>
      </HeaderDetails>

      <Feather name="more-horizontal" size={24} color="#666" />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
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

const HeaderDetails = styled.View`
  flex: 1;
`;

const UserName = styled.Text`
  color: #222;
  font-size: 16px;
  font-weight: 500;
`;

const ItemDate = styled.Text`
  color: #222;
  font-size: 14px;
  font-weight: 300;
`;

export default FeedItemHeader;
