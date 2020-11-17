import {Container, Thumbnail, View} from 'native-base';
import React from 'react';
import globalStyles from '../styles/global';

// Assets
const img = {src: require('../assets/loading.gif')};

export const Loading = () => {
  return (
    <>
      <Container style={globalStyles.container}>
        <View style={[globalStyles.content, globalStyles.centerContent]}>
          <Thumbnail style={globalStyles.imageLoading} source={img.src} />
        </View>
      </Container>
    </>
  );
};
