import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  navigation: any;
}
function Start({ navigation }: Props) {
  return (
    <Wrapper>
      <Button onPress={() => navigation.navigate('Main')} title="Start" />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Start;
