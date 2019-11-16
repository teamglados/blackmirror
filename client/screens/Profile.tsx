import React from 'react';
import styled from 'styled-components/native';

import { sleep } from '../utils';
import { ProfileData } from '../utils/types';
import ProfileDetails from '../components/ProfileDetails';
import ProfileHeader from '../components/ProfileHeader';
import ProfileBio from '../components/ProfileBio';
import ProfileFriends from '../components/ProfileFriends';
import ProfileFeed from '../components/ProfileFeed';
import Divider from '../components/common/Divider';

const mockData: ProfileData = {
  _id: 1,
  name: 'Teemu Taskula',
  avatar: 'https://placeimg.com/140/140/any',
  cover: 'https://placeimg.com/500/200/any',
  currentHometown: 'Helsinki',
  currentJob: 'Alepa',
  currentStudy: 'Eira’s Adult University',
  bio: 'Burn rate partnership lean startup user experience business-to-business business model canvas accelerator equity agile development virality hackathon entrepreneur technology ramen.', // prettier-ignore
  friendCount: 321,
  friendPicks: [
    { _id: 1, name: 'Jonne Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { _id: 2, name: 'Arttu Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { _id: 3, name: 'Kihhu Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { _id: 4, name: 'Gugge Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { _id: 5, name: 'Hidde Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
    { _id: 6, name: 'Juffe Foobar', avatar: 'https://placeimg.com/200/200/any' }, // prettier-ignore
  ],
  feed: [
    {
      _id: 1,
      createdAt: new Date().toISOString(),
      image: 'https://placeimg.com/500/300/any',
      text: 'Vesting period handshake user experience infrastructure startup. Android crowdsource return on investment. Lean startup research & development business-to-consumer success startup low hanging fruit. Business plan success supply chain.', // prettier-ignore
      likeCount: 123,
      commentCount: 12,
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ],
};

function ProfileScreen() {
  const [profileData, setProfileData] = React.useState<ProfileData>();

  React.useEffect(() => {
    async function loadData() {
      await sleep(100);
      setProfileData(mockData);
    }

    loadData();
  }, []);

  if (!profileData) return null;

  return (
    <Wrapper>
      <ProfileHeader data={profileData} />
      <Scroller>
        <ProfileDetails data={profileData} />
        <ProfileBio data={profileData} />
        <ProfileFriends data={profileData} />
        <Divider />
        <ProfileFeed data={profileData} />
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
