import React from 'react';
import { View, StyleSheet } from 'react-native';
import ConnectWallet from '../components/ConnectWallet';
import GoogleLogin from '../components/GoogleLogin';

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <GoogleLogin />
      <View style={styles.spacing} />
      <ConnectWallet />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    marginVertical: -285, // İki bileşen arasındaki dikey boşluğu ayarlamak için kullanılır
  },
});

export default WelcomeScreen;
