import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import Text from '../components/common/Text';
import Button from '../components/common/Button';
import { clearUser } from '../utils/storage';
import Spacing from '../components/common/Spacing';

const texts = [
  'How did that experience make you feel?',
  'For some people that is their everyday life.',
  'Something something something.',
  'Black Mirror',
];

function EndScreen({ navigation }) {
  const [animations] = React.useState([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]);

  async function handleStartOver() {
    await clearUser();
    navigation.replace('Start');
  }

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
      Animated.delay(2000),
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
      Animated.delay(1000),
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

          {index === texts.length - 1 && (
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
          )}
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
