import React from 'react';
import { Image, StyleSheet, MaskedViewIOS } from 'react-native';
import styled from 'styled-components/native';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BlurView } from 'expo-blur';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../constants/display';

interface FaceBounds {
  origin: { x: number; y: number };
  size: { height: number; width: number };
}

function CameraScreen() {
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [faceDetectionEnabled, setFaceDetectionEnabled] = React.useState(false);
  const [faceDetected, setFaceDetected] = React.useState(false);
  const [faceBounds, setFaceBounds] = React.useState<FaceBounds>(null);
  const [bgUri, setBgUri] = React.useState();
  const cameraRef = React.useRef<any>();

  async function takeBgPicture() {
    if (!cameraRef.current) return;

    const pic = await cameraRef.current.takePictureAsync({
      quality: 0.1,
      base64: true,
      exif: false,
    });
    setBgUri(pic.uri);
    takeBgPicture();
  }

  async function handleFaceDetect({ faces = [] }) {
    if (!faceDetectionEnabled || faces.length === 0) return;

    const face = faces[0];
    setFaceBounds(face.bounds);

    // Face detected for the first time
    if (!faceDetected) {
      takeBgPicture();
      setFaceDetected(true);
    }
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

  return (
    <Wrapper>
      {!!bgUri && (
        <Image
          style={{
            ...StyleSheet.absoluteFillObject,
            transform: [{ rotateY: '180deg' }],
          }}
          source={{ uri: bgUri }}
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
            <FaceBoundsBox
              x={faceBounds ? faceBounds.origin.x : 0}
              y={faceBounds ? faceBounds.origin.y : 0}
              w={faceBounds ? faceBounds.size.width : WINDOW_WIDTH}
              h={faceBounds ? faceBounds.size.height : WINDOW_HEIGHT}
              style={{ borderRadius: faceBounds ? 32 : 0 }}
            />
          }
        >
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
        </MaskedViewIOS>
        {/* {!!faceBounds && <TakePhoto />} */}
      </BlurView>
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

const FaceBoundsBox = styled.View<FaceBoundBoxT>`
  left: ${props => props.x};
  top: ${props => props.y};
  width: ${props => props.w};
  height: ${props => props.h};
  background-color: #000;
`;

const TakePhoto = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: red;
  padding: 24px;
  border-radius: 99px;
`;

export default CameraScreen;
