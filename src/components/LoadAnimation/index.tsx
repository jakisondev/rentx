import React from 'react';
// import LottieView from 'lottie-react-native';

// import loadingCar from '../../assets/loadingCar.json';

import { Text } from 'react-native';

import {
  Container
} from './styles';

export function LoadAnimation(){
  return (
    <Container>
        <Text>Carregando...</Text>
      {/* <LottieView
        source={loadingCar}
        style={{ height: 200 }}
        resizeMode="contain"
        autoPlay
        loop
      /> */}
    </Container>
  );
}