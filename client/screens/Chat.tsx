import React from 'react';
import styled from 'styled-components/native';
import { GiftedChat } from 'react-native-gifted-chat';
import { sleep } from '../utils';
import { TAB_BAR_HEIGHT } from '../constants/display';

const mockData = [
  {
    _id: 1,
    text: 'Hello developer',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'React Native',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
];

function ChatScreen() {
  const [messages, setMessages] = React.useState([]);

  function handleSend(sentMessages = []) {
    console.log('> sentMessages', sentMessages);
    setMessages(prevMessages => GiftedChat.append(prevMessages, sentMessages));
  }

  React.useEffect(() => {
    async function loadMessages() {
      await sleep(1000);
      setMessages(mockData);
    }

    loadMessages();
  }, []);

  return (
    <Wrapper>
      <GiftedChat
        messages={messages}
        onSend={handleSend}
        user={{ _id: 1 }}
        bottomOffset={TAB_BAR_HEIGHT}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ChatScreen;
