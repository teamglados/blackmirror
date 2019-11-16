import React from 'react';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import { User, UserDetails } from '../utils/types';
import Button from './common/Button';

interface Props {
  data: User & UserDetails;
}

function ProfileDetails({ data }: Props) {
  return (
    <Wrapper>
      <Cover>
        <CoverImage source={{ uri: data.cover }} resizeMode="cover" />
      </Cover>

      <AvatarWrapper>
        <Avatar>
          <AvatarImage source={{ uri: data.image }} />
        </Avatar>

        <MainTitle>
          {data.firstName} {data.lastName}
        </MainTitle>
      </AvatarWrapper>

      <Button>
        <Entypo name="camera" size={16} color="#fff" />
        <AddStoryButtonText>{'  '}Add a story</AddStoryButtonText>
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  padding: 16px;
`;

const Cover = styled.View`
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  height: 200px;
`;

const CoverImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const AvatarWrapper = styled.View`
  align-items: center;
  margin-top: -80px;
`;

const Avatar = styled.View`
  height: 160px;
  width: 160px;
  border-radius: 80px;
  overflow: hidden;
  border: 4px solid #fff;
  margin-bottom: 16px;
`;

const AvatarImage = styled.Image`
  height: 160px;
  width: 160px;
`;

const MainTitle = styled.Text`
  font-weight: 700;
  font-size: 24px;
  color: #222;
  margin-bottom: 24px;
`;

const AddStoryButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
`;

export default ProfileDetails;
