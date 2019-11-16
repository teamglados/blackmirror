import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

import {
  Feather,
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';

import { FeedDataItem } from '../utils/types';
import { WINDOW_WIDTH } from '../constants/display';

interface Props {
  data: FeedDataItem;
}

function FeedItem({ data }: Props) {
  return (
    <Wrapper>
      <Header>
        <Avatar>
          <AvatarImage source={{ uri: data.user.avatar }} resizeMode="cover" />
        </Avatar>

        <HeaderDetails>
          <UserName>{data.user.name}</UserName>
          <ItemDate>{data.createdAt}</ItemDate>
        </HeaderDetails>

        <Feather name="more-horizontal" size={24} color="#666" />
      </Header>

      <TextContent>{data.text}</TextContent>

      <FeedImage source={{ uri: data.image }} resizeMode="cover" />

      <Footer>
        <MetaData>
          <MetaItem>
            <MetaCircle bg="blue" style={{ zIndex: 1 }}>
              <AntDesign name="like1" size={12} color="#fff" />
            </MetaCircle>
            <MetaCircle bg="red" style={{ marginLeft: -4, zIndex: 0 }}>
              <FontAwesome name="heart" size={11} color="#fff" />
            </MetaCircle>
            <MetaText>32</MetaText>
          </MetaItem>
        </MetaData>

        <Actions>
          <Action>
            <AntDesign name="like2" size={20} color="#666" />
            <ActionText>Like</ActionText>
          </Action>

          <Action>
            <EvilIcons name="comment" size={24} color="#666" />
            <ActionText>Comment</ActionText>
          </Action>

          <Action>
            <MaterialCommunityIcons
              name="share-outline"
              size={26}
              color="#666"
            />
            <ActionText>Share</ActionText>
          </Action>
        </Actions>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  background-color: #fff;
  padding-top: 16px;
  border-color: #ddd;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

const Header = styled.View`
  padding-left: 16px;
  padding-right: 16px;
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
  font-size: 14px;
  font-weight: 500;
`;

const ItemDate = styled.Text`
  color: #222;
  font-size: 14px;
  font-weight: 200;
`;

const TextContent = styled.Text`
  color: #222;
  font-size: 14px;
  padding: 16px;
`;

const FeedImage = styled.Image`
  width: ${WINDOW_WIDTH}px;
  height: 300px;
`;

const MetaData = styled.View`
  padding-bottom: 8px;
`;

const Footer = styled.View`
  padding: 16px;
`;

const Actions = styled.View`
  flex-direction: row;
  border-top-color: #eee;
  border-top-width: 1px;
  padding-top: 8px;
`;

const Action = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ActionText = styled.Text`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-left: 4px;
`;

const MetaItem = styled.View`
  flex-direction: row;
`;

const MetaCircle = styled.View<{ bg: string }>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${props => props.bg};
  border: 2px solid #fff;
`;

const MetaText = styled.Text`
  color: #666;
  font-size: 14px;
  margin-left: 4px;
`;

export default FeedItem;
