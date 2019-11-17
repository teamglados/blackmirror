import React from 'react';
import { InputAccessoryView } from 'react-native';
import styled from 'styled-components/native';

import theme from '../constants/theme';
import Text from './common/Text';

interface Props {
  onAdd: (text: string) => any;
}

function CommentInput({ onAdd }: Props) {
  const [isFocused, setFocused] = React.useState(false);
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<any>();

  function handleFocus() {
    setFocused(true);
    inputRef.current.focus();
  }

  function handleBlur() {
    setFocused(false);
    setValue('');
  }

  function handleAdd() {
    setFocused(false);
    inputRef.current.blur();
    onAdd(value);
    setValue('');
  }

  return (
    <>
      <InputAccessoryView>
        <Wrapper
          style={{ opacity: isFocused ? 1 : 0 }}
          pointerEvents={isFocused ? 'auto' : 'none'}
        >
          <Input
            ref={inputRef}
            value={value}
            onChangeText={v => setValue(v)}
            placeholder="Type a comment.."
            placeholderTextColor={theme.grey.dark1}
            onBlur={handleBlur}
          />

          {!!value && (
            <AddButton onPress={handleAdd}>
              <Text weight={700} size={16} color={theme.primary.base}>
                Add
              </Text>
            </AddButton>
          )}
        </Wrapper>
      </InputAccessoryView>

      {!isFocused && (
        <FakeInput onPress={handleFocus}>
          <FakeInputWrapper>
            <Text color={theme.grey.dark1}>Type a comment...</Text>
          </FakeInputWrapper>
        </FakeInput>
      )}
    </>
  );
}

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
`;

const FakeInput = styled.TouchableWithoutFeedback``;

const FakeInputWrapper = styled.View`
  padding: 16px;
  background-color: #fff;
`;

const Input = styled.TextInput`
  font-size: 16px;
  padding: 16px;
  flex: 1;
`;

const AddButton = styled.TouchableOpacity`
  margin-right: 16px;
`;

export default CommentInput;
