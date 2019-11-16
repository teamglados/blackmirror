import React from 'react';
import { Animated } from 'react-native';

interface Props {
  isVisible: boolean;
  children: any;
}

function Fade({ isVisible, children }: Props) {
  const [isVisibleLocal, setVisible] = React.useState(false);
  const [visibility] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(visibility, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => !isVisible && setVisible(isVisible));

    if (isVisible) setVisible(isVisible);
  }, [isVisible, visibility]);

  const translateY = visibility.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 0],
  });

  const containerStyle = {
    transform: [{ translateY }],
    opacity: visibility.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={containerStyle}>
      {isVisibleLocal ? children : null}
    </Animated.View>
  );
}

export default Fade;
