import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { User } from '../utils/types';

interface Props {
  data: User;
}

function ProfileHeader({ data }: Props) {
  return (
    <Wrapper>
      <HeaderOffset />
      <HeaderTitle>
        {data.firstName} {data.lastName}
      </HeaderTitle>
      <MaterialCommunityIcons name="account-edit" size={32} color="#222" />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #ddd;
`;

const HeaderTitle = styled.Text`
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  color: #222;
`;

const HeaderOffset = styled.View`
  width: 32px;
`;

export default ProfileHeader;
