import React from 'react';
import styled from 'styled-components/native';

import { ProfileData } from '../utils/types';
import Text from './common/Text';
import Button from './common/Button';
import theme from '../constants/theme';
import { WINDOW_WIDTH } from '../constants/display';

interface Props {
  data: ProfileData;
}

function ProfileFriends({ data }: Props) {
  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <Text size={18} weight={700}>
            Friends
          </Text>
          <Text color="#888">{data.friendCount} friends</Text>
        </HeaderLeft>

        <FindFriendsButton>
          <Text color={theme.primary.base}>Find friends</Text>
        </FindFriendsButton>
      </Header>

      <FriendPicks>
        {data.friendPicks.map(friend => (
          <FriendCard key={friend._id}>
            <FriendCardImageWrapper>
              <FriendCardImage source={{ uri: friend.avatar }} />
            </FriendCardImageWrapper>

            <FriendCardTextWrapper>
              <Text size={14} weight={500}>
                {friend.name}
              </Text>
            </FriendCardTextWrapper>
          </FriendCard>
        ))}
      </FriendPicks>

      <Button variant="secondary">Show all friends</Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  padding: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderLeft = styled.View``;

const FindFriendsButton = styled.TouchableOpacity``;

const FriendPicks = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const FriendCard = styled.TouchableOpacity`
  width: ${WINDOW_WIDTH / 3 - 22};
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 8px;
  margin: 8px;
`;

const FriendCardImageWrapper = styled.View`
  width: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  overflow: hidden;
`;

const FriendCardImage = styled.Image`
  width: 100%;
  height: 100px;
`;

const FriendCardTextWrapper = styled.View`
  padding: 8px;
`;

export default ProfileFriends;
