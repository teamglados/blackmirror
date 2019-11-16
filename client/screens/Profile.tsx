import React from 'react';
import styled from 'styled-components/native';

import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBio from '../components/ProfileBio';
import ProfileFriends from '../components/ProfileFriends';
import ProfileFeed from '../components/ProfileFeed';
import Divider from '../components/common/Divider';
import { useAppState } from '../utils/context';
import { userDetails } from '../utils/data';

function ProfileScreen({ navigation }) {
  // TODO: get posts from other API endpoint
  const { user, posts } = useAppState();

  return (
    <Wrapper>
      <ProfileHeader data={user} />
      <Scroller>
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
