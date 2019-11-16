import React from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';

import { ProfileData } from '../utils/types';

interface Props {
  data: ProfileData;
}

function ProfileBio({ data }: Props) {
  return (
    <Wrapper>
      <BioText>{data.bio}</BioText>

      <CurrentDetails>
        <CurrentDetailItem>
          <Entypo name="briefcase" size={20} color="#999" />
          <CurrentDetailText>
            Working at{' '}
            <CurrentDetailHighlight>{data.currentJob}.</CurrentDetailHighlight>
          </CurrentDetailText>
        </CurrentDetailItem>

        <CurrentDetailItem>
          <Entypo name="graduation-cap" size={20} color="#999" />
          <CurrentDetailText>
            Studying at{' '}
            <CurrentDetailHighlight>
              {data.currentStudy}.
            </CurrentDetailHighlight>
          </CurrentDetailText>
        </CurrentDetailItem>

        <CurrentDetailItem>
          <Entypo name="home" size={20} color="#999" />
          <CurrentDetailText>
            Living in{' '}
            <CurrentDetailHighlight>
              {data.currentHometown}.
            </CurrentDetailHighlight>
          </CurrentDetailText>
        </CurrentDetailItem>
      </CurrentDetails>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  padding: 16px;
  border-top-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-color: #ddd;
`;

const BioText = styled.Text`
  font-size: 14px;
  color: #222;
`;

const CurrentDetails = styled.View`
  margin-top: 24px;
`;

const CurrentDetailItem = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const CurrentDetailText = styled.Text`
  font-size: 16px;
  color: #444;
  margin-left: 8px;
`;

const CurrentDetailHighlight = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.grey.dark3};
  font-weight: 500;
`;

export default ProfileBio;
