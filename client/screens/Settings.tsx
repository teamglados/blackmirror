import React from 'react';
import styled from 'styled-components/native';
import Button from '../components/common/Button';
import { useAppReset } from '../utils/context';

function SettingsScreen({ navigation }) {
  const reset = useAppReset();

  return (
    <Wrapper>
      <ButtonWrapper>
        <Button variant="secondary" onPress={reset}>
          Reset
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
