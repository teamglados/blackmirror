import React from 'react';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFocusEffect } from '@react-navigation/core';

import { TAB_BAR_HEIGHT } from '../constants/display';
import { useAppState, useAppDispatch } from '../utils/context';
import { Message } from '../utils/types';
import { getMeanPosts, getMeanUser } from '../utils/data';
import { sleep } from '../utils';

function mangleMessages(messages: Message[]) {
  return messages.map(m => ({
    _id: m.id,
    text: m.content.text,
    image: m.content.image,
    createdAt: new Date(m.content.timestampMsCreated),
    user: {
      _id: m.user.id,
      name: `${m.user.firstName} ${m.user.lastName}`,
      avatar: m.user.image,
    },
  }));
}

function ChatScreen({ navigation }) {
  const { messages, user } = useAppState();
  const dispatch = useAppDispatch();
  const [messageIndex, setMessageIndex] = React.useState(0);
  const [localMessages, setLocalMessages] = React.useState(
    mangleMessages([messages[0]])
  );

  async function coordinateResponse(i) {
    await sleep(1000);
    const response = messages[i];
    setLocalMessages(prevMessages =>
      GiftedChat.append(prevMessages, mangleMessages([response]))
    );
  }

  function handleSend(sentMessages = []) {
    setLocalMessages(prevMessages =>
      GiftedChat.append(prevMessages, sentMessages)
    );
    const nextIndex = messageIndex + 1;
    setMessageIndex(nextIndex);
    coordinateResponse(nextIndex);
  }

  function handleSecretLink() {
    navigation.navigate('Profile', {
      posts: getMeanPosts(user),
      user: getMeanUser(user),
    });
  }

  // Sync messages
  // React.useEffect(() => {
  //   if (messages.length > localMessages.length) {
  //     setLocalMessages(mangleMessages(messages));
  //   }
  // }, [messages, localMessages]);

  // Clear notifications on mount
  useFocusEffect(
    React.useCallback(() => {
      dispatch({ type: 'clear-notifications' });
    }, [dispatch])
  );

  return (
    <Wrapper>
      <GiftedChat
        bottomOffset={TAB_BAR_HEIGHT}
        messages={localMessages}
        onSend={handleSend}
        parsePatterns={() => [
          {
            pattern: /<(\w+)>/,
            style: { fontWeight: '700' },
            onPress: handleSecretLink,
          },
        ]}
        user={{
          _id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          avatar: user.image,
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ChatScreen;
