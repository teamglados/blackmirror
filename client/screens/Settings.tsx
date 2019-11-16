import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/common/Button';
import { clearUser } from '../utils/storage';

function SettingsScreen({ navigation }) {
  async function clear() {
    await clearUser();
    navigation.navigate('Start');
  }

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button variant="secondary" onPress={clear}>
          Clear user
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default SettingsScreen;
