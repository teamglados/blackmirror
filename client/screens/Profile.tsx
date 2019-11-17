import React from 'react';
import styled from 'styled-components/native';
import { get } from 'lodash';

import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBio from '../components/ProfileBio';
import ProfileFriends from '../components/ProfileFriends';
import ProfileFeed from '../components/ProfileFeed';
import Divider from '../components/common/Divider';
import { useAppState } from '../utils/context';
import { userDetails } from '../utils/data';
import { WINDOW_HEIGHT } from '../constants/display';

function ProfileScreen({ navigation, route }) {
  const state = useAppState();
  const user = get(route, 'params.user', state.user);
  const posts = get(route, 'params.posts', state.posts);
  const [endTriggered, setEndTriggered] = React.useState(false); // prettier-ignore

  function handleScroll({ nativeEvent: { contentOffset } }) {
    if (endTriggered) return;

    if (contentOffset.y > WINDOW_HEIGHT * 2) {
      setEndTriggered(true);
      navigation.navigate('End');
    }
  }

  return (
    <Wrapper>
      <ProfileHeader data={user} />
      <Scroller onScroll={handleScroll} scrollEventThrottle={200}>
        <ProfileDetails data={{ ...user, ...userDetails }} />
        <ProfileBio data={userDetails} />
        <ProfileFriends data={userDetails} />
        <Divider />
        <ProfileFeed data={posts} navigation={navigation} />
      </Scroller>
    </Wrapper>
  );
}

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

const Scroller = styled.ScrollView`
  flex: 1;
`;

export default ProfileScreen;
