import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ConnectWallet from '../components/ConnectWallet';
import GoogleLogin from '../components/GoogleLogin';

const WelcomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/voter_dao_logo.png')} style={styles.logo} />
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
    paddingVertical: 20, // Üst ve alt boşluk
  },
  logo: {
    width: 300,
    height: 400,
    marginBottom: 20, // Logonun altındaki bileşenlerle arasındaki boşluk
  },
  spacing: {
    marginVertical: -60, // İki bileşen arasındaki dikey boşluk
  },
});

export default WelcomeScreen;
