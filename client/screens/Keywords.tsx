import React from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { chunk } from 'lodash';

import { categories } from '../utils/data';
import theme from '../constants/theme';
import Text from '../components/common/Text';
import Spacing from '../components/common/Spacing';
import Fade from '../components/common/Fade';
import { WINDOW_WIDTH } from '../constants/display';

function KeywordsScreen({ navigation }) {
  const [revealAnim] = React.useState(new Animated.Value(0));
  const [revealDone, setRevealDone] = React.useState(false);
  const [contentAnim] = React.useState(new Animated.Value(0));
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const lastNameInputRef = React.useRef<any>();

  const [selectedCategories, setSelectedCategories] = React.useState(
    categories.reduce((acc, cat) => {
      acc[cat.name] = [];
      return acc;
    }, {})
  );

  const hasSelectedCategories =
    Object.values(selectedCategories)
      .map((c: any[]) => c.length > 0)
      .filter(Boolean).length === categories.length;

  function handleOptionPress(category, option) {
    const found = selectedCategories[category].some(x => x === option);

    setSelectedCategories(prev => {
      const newState = { ...prev };
      if (found) {
        // De-select
        newState[category] = prev[category].filter(x => x !== option);
      } else {
        // Select
        newState[category] = [...prev[category], option];
      }
      return newState;
    });
  }

  function getOptionSelected(category, option) {
    return selectedCategories[category].some(x => x === option);
  }

  function handleFirstNameBlur() {
    // Auto-focus next input
    if (firstName && lastNameInputRef.current) {
      lastNameInputRef.current.focus();
    }
  }

  function handleNext() {
    const data: any = { firstName, lastName, selectedCategories };
    navigation.navigate('Camera', { data });
  }

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(revealAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(revealAnim, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
    setRevealDone(true);
  }, [revealAnim, contentAnim]);

  return (
    <Wrapper>
      <Scroller>
        <Content style={{ opacity: contentAnim }}>
          <Text color="#fff" size={32} weight={700}>
            Please tell a little about yourself
          </Text>

          <Spacing vertical amount={24} />

          <Input
            value={firstName}
            onChange={v => setFirstName(v)}
            placeholder="What is your first name?"
            label="First name"
            onBlur={handleFirstNameBlur}
          />

          <Spacing vertical />

          <Fade isVisible={!!firstName}>
            <Input
              inputRef={lastNameInputRef}
              value={lastName}
              onChange={v => setLastName(v)}
              placeholder="What is your last name?"
              label="Last name"
            />
          </Fade>

          <Spacing vertical />

          <Fade isVisible={!!firstName && !!lastName}>
            <KeywordCategories>
              {categories.map(({ name, options }) => {
                const chunkedOptions = chunk(options, 4);

                return (
                  <CategorySection key={name}>
                    <Text color="#fff" size={24} weight={500}>
                      Favorite {name}?
                    </Text>

                    <Spacing vertical />

                    <CategoryOptions horizontal>
                      <CategoryOptionsWrapper>
                        {chunkedOptions.map((options, index) => (
                          <CategoryOptionsRow key={index}>
                            {options.map(option => (
                              <CategoryOption
                                key={option}
                                isSelected={getOptionSelected(name, option)}
                                onPress={() => handleOptionPress(name, option)}
                              >
                                <Text color="#fff">{option}</Text>
                              </CategoryOption>
                            ))}
                          </CategoryOptionsRow>
                        ))}
                      </CategoryOptionsWrapper>
                    </CategoryOptions>
                  </CategorySection>
                );
              })}
            </KeywordCategories>
          </Fade>

          <Fade isVisible={hasSelectedCategories}>
            <NextButton onPress={handleNext}>
              <Text color="#fff" size={24} weight={700}>
                Next
              </Text>
            </NextButton>
          </Fade>
        </Content>
      </Scroller>

      <Overlay
        pointerEvents={revealDone ? 'none' : 'auto'}
        style={{
          opacity: revealAnim.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 0],
          }),
          transform: [
            {
              translateY: revealAnim.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [30, 0, -40],
              }),
            },
          ],
        }}
      >
        <LogoImage
          source={require('../assets/logo_white.png')}
          resizeMode="contain"
        />
        {/* <Text color="#fff" size={32} weight={700}>
          Black Mirror
        </Text> */}
      </Overlay>
    </Wrapper>
  );
}

interface InputProps {
  value: string;
  placeholder: string;
  label: string;
  onChange: any;
  onBlur?: any;
  inputRef?: any;
}

function Input({
  value,
  onChange,
  placeholder,
  label,
  onBlur,
  inputRef,
}: InputProps) {
  const [labelAnim] = React.useState(new Animated.Value(0));
  const [isFocused, setFocused] = React.useState(false);
  const isValid = !isFocused && !!value;

  function handleFocus() {
    setFocused(true);
    Animated.timing(labelAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }

  function handleBlur() {
    setFocused(false);
    if (onBlur) onBlur();
    if (value) return;

    Animated.timing(labelAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 200,
    }).start();
  }

  return (
    <InputWrapper>
      <Label
        style={{
          opacity: labelAnim,
          transform: [
            {
              translateY: labelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >
        {label}
      </Label>

      <TextInput
        ref={inputRef || null}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={theme.grey.dark2}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      {isValid && (
        <Valid>
          <Ionicons name="ios-checkmark-circle" color="#fff" size={40} />
        </Valid>
      )}
    </InputWrapper>
  );
}

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Valid = styled.View`
  margin-left: 8px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding: 24px 0px;
  font-size: 24px;
  color: #fff;
`;

const Label = Animated.createAnimatedComponent(styled.Text`
  font-size: 14px;
  color: ${props => props.theme.grey.dark1};
  position: absolute;
  top: 0;
  left: 0;
`);

// ---------------------------------------------

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #000;
`;

const Scroller = styled.ScrollView`
  flex: 1;
`;

const Content = Animated.createAnimatedComponent(styled.View`
  padding: 24px;
`);

const Overlay = Animated.createAnimatedComponent(styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`);

const KeywordCategories = styled.View``;

const CategorySection = styled.View`
  margin-bottom: 32px;
`;

const CategoryOptions = styled.ScrollView``;

const CategoryOptionsWrapper = styled.View``;

const CategoryOptionsRow = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const CategoryOption = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${props =>
    props.isSelected ? props.theme.primary.base : props.theme.grey.dark3};
  padding: 8px 16px;
  border-radius: 99px;
  margin-right: 8px;
`;

const NextButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.primary.base};
  padding: 18px 24px;
  border-radius: 99px;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.Image`
  width: ${WINDOW_WIDTH * 0.6};
  height: 200px;
`;

export default KeywordsScreen;
