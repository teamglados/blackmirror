import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { range } from 'lodash';

import Text from '../components/common/Text';
import { clearUser } from '../utils/storage';
// import Button from '../components/common/Button';
// import Spacing from '../components/common/Spacing';

const texts = [
  'How did that experience make you feel?',
  'Some people experience that every day.',
  'Mirroring these feelings can help you understand what other’s are going through.',
  'For a world without bullying.',
  'Black Mirror',
];

function EndScreen({ navigation }) {
  const [animations] = React.useState(
    range(texts.length).map(() => new Animated.Value(0))
  );

  // async function handleStartOver() {
  //   await clearUser();
  //   navigation.replace('Start');
  // }

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(animations[0], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(animations[0], {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(animations[1], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(animations[1], {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(animations[2], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(animations[2], {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(animations[3], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(animations[3], {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),

      Animated.timing(animations[4], {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animations]);

  return (
    <Wrapper>
      {texts.map((text, index) => (
        <Overlay
          key={text}
          style={{
            opacity: animations[index].interpolate({
              inputRange: [0, 1, 2],
              outputRange: [0, 1, 0],
            }),
            transform: [
              {
                translateY: animations[index].interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [30, 0, -40],
                }),
              },
            ],
          }}
        >
          <Text color="#fff" size={32} weight={700}>
            {text}
          </Text>

          {/* {index === texts.length - 1 && (
            <>
              <Spacing vertical amount={24} />
              <Animated.View
                style={{
                  opacity: animations[animations.length - 1].interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, 1, 0],
                  }),
                }}
              >
                <Button variant="secondary" onPress={handleStartOver}>
                  Start over
                </Button>
              </Animated.View>
            </>
          )} */}
        </Overlay>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

const Overlay = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  padding: 24px;
`);

export default EndScreen;
