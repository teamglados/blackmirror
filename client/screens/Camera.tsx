import React from 'react';
import { Image, StyleSheet, MaskedViewIOS } from 'react-native';
import styled from 'styled-components/native';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../constants/display';
import { StartData } from '../utils/types';
import Text from '../components/common/Text';
import Spacing from '../components/common/Spacing';

interface FaceBounds {
  origin: { x: number; y: number };
  size: { height: number; width: number };
}

function CameraScreen({ route }) {
  const data: StartData = route.params.data;
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [faceDetectionEnabled, setFaceDetectionEnabled] = React.useState(false);
  const [faceBounds, setFaceBounds] = React.useState<FaceBounds>(null);
  const [picUri, setPicUri] = React.useState();
  const cameraRef = React.useRef<any>();

  async function takePicture() {
    if (!cameraRef.current) return;

    const pic = await cameraRef.current.takePictureAsync({
      quality: 0.5,
      base64: true,
      exif: false,
    });

    setPicUri(pic.uri);
  }

  async function handleFaceDetect({ faces = [] }) {
    if (!faceDetectionEnabled || picUri || faces.length === 0) return;

    const face = faces[0];
    setFaceBounds(face.bounds);
  }

  React.useEffect(() => {
    async function askPermissions() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setPermissionGranted(status === 'granted');
    }

    askPermissions();
  }, []);

  React.useEffect(() => {
    setTimeout(() => setFaceDetectionEnabled(true), 2000);
  }, []);

  if (!permissionGranted) {
    return <PermissionPlaceholder />;
  }

  const enableMask = !!picUri && !!faceBounds;

  return (
    <Wrapper>
      {!!picUri && (
        <Image
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ rotateY: '180deg' }],
          }}
          source={{ uri: picUri }}
        />
      )}

      <BlurView
        tint="default"
        intensity={faceBounds ? 100 : 0}
        style={StyleSheet.absoluteFillObject}
      >
        <MaskedViewIOS
          style={{ flex: 1 }}
          maskElement={
            <FaceBoundsMask
              x={enableMask ? faceBounds.origin.x : 0}
              y={enableMask ? faceBounds.origin.y : 0}
              w={enableMask ? faceBounds.size.width : WINDOW_WIDTH}
              h={enableMask ? faceBounds.size.height : WINDOW_HEIGHT}
              style={{ borderRadius: enableMask ? 99999 : 0 }}
            />
          }
        >
          {!picUri ? (
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFillObject}
              type={Camera.Constants.Type.front}
              onFacesDetected={handleFaceDetect}
              faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Landmarks.none,
                runClassifications: FaceDetector.Constants.Classifications.none,
                minDetectionInterval: 50,
                tracking: true,
              }}
            />
          ) : (
            <Image
              style={{
                ...StyleSheet.absoluteFillObject,
                transform: [{ rotateY: '180deg' }],
              }}
              source={{ uri: picUri }}
            />
          )}

          {!picUri && !!faceBounds && (
            <FaceBoundsBox
              x={faceBounds.origin.x}
              y={faceBounds.origin.y}
              w={faceBounds.size.width}
              h={faceBounds.size.height}
            />
          )}
        </MaskedViewIOS>
      </BlurView>

      {!!faceBounds && !picUri && (
        <TakePicOverlay onPress={takePicture}>
          <TakePicGuideWrapper>
            <BlurView
              tint="dark"
              intensity={100}
              style={StyleSheet.absoluteFillObject}
            >
              <TakePicGuide>
                <MaterialCommunityIcons
                  name="camera-party-mode"
                  color="#fff"
                  size={24}
                />
                <Spacing amount={8} />
                <Text color="#fff" weight={500}>
                  Tap the screen to take your photo
                </Text>
              </TakePicGuide>
            </BlurView>
          </TakePicGuideWrapper>
        </TakePicOverlay>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

const PermissionPlaceholder = styled.View`
  flex: 1;
  background-color: #000;
`;

interface FaceBoundBoxT {
  w: number;
  h: number;
  x: number;
  y: number;
}

const FaceBoundsBase = styled.View<FaceBoundBoxT>`
  left: ${props => props.x};
  top: ${props => props.y};
  width: ${props => props.w};
  height: ${props => props.h};
`;

const FaceBoundsBox = styled(FaceBoundsBase)`
  border: 1px dotted #fff;
  border-radius: 8px;
`;

const FaceBoundsMask = styled(FaceBoundsBase)`
  background-color: #000;
`;

const TakePicOverlay = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  justify-content: flex-end;
  padding: 80px 32px;
  z-index: 1;
`;

const TakePicGuideWrapper = styled.View`
  border-radius: 99px;
  height: 60px;
  overflow: hidden;
`;

const TakePicGuide = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default CameraScreen;
