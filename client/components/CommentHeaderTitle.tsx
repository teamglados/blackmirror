import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

import { FeedDataItem } from '../utils/types';
import FeedItemHeader from './FeedItemHeader';
import Text from './common/Text';
import theme from '../constants/theme';

function CommentHeaderTitle({ scene, previous, navigation }: any) {
  const data: FeedDataItem = scene.route.params.data;

  return (
    <Wrapper>
      <Content>
        <Back onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="chevron-left"
            size={48}
            color={theme.grey.dark3}
          />
        </Back>
        <TitleContent>
          <FeedItemHeader data={data} />
        </TitleContent>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  padding-left: 0;
`;

const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleContent = styled.View`
  flex: 1;
`;

const Back = styled.TouchableOpacity`
  margin-right: 8px;
`;

export default CommentHeaderTitle;
