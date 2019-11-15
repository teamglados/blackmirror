import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';

function KeywordsScreen({ navigation }) {
  return (
    <Wrapper>
      <Button onPress={() => navigation.navigate('Camera')} title="To camera" />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default KeywordsScreen;
