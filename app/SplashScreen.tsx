import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import * as SplashScreen from 'expo-splash-screen';

type SplashScreenProps = {
  onFinish: () => void;
};

const SplashScreenComponent: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(() => {
        setIsReady(true);
        SplashScreen.hideAsync();
        onFinish();
      }, 5120); // Adjust the timeout to match the duration of your GIF
    };
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      {isReady ? (
        <FastImage
          style={styles.image}
          source={require('./splashGIF.gif')}
          resizeMode={FastImage.resizeMode.contain}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreenComponent;
