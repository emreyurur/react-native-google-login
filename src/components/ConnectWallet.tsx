import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Linking, StyleSheet, ImageRequireSource, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import base58 from 'bs58';
import nacl from 'tweetnacl';
import 'react-native-get-random-values';

interface ImagePressProps {
  onPress: () => void;
  image: ImageRequireSource;
}

const ConnectWallet: React.FC = () => {
  const [dappKeyPair, setDappKeyPair] = useState<nacl.BoxKeyPair | null>(null);

  useEffect(() => {
    const generateRandomKeyPair = () => {
      try {
        const newKeyPair = nacl.box.keyPair();
        setDappKeyPair(newKeyPair);
      } catch (error) {
        console.error('Error generating random key pair:', error);
      }
    };

    generateRandomKeyPair();
  }, []);

  const handleConnectPhantom = async () => {
    if (dappKeyPair) {
      const params = new URLSearchParams({
        dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
        cluster: 'mainnet-beta', // or 'testnet'
        app_url: 'https://phantom.app',
        redirect_link: 'myapp://onConnect', // Make sure this matches your scheme
      });

      const connectUrl = `phantom://v1/connect?${params.toString()}`;

      try {
        await Linking.openURL(connectUrl);
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {dappKeyPair && (
          <TouchableOpacity onPress={handleConnectPhantom} style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require('../assets/phantomcircle.png')} style={styles.icon} resizeMode="contain" />
              <Text style={styles.buttonText}>Connect Phantom</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#3498db', // Örnek bir renk
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight:"bold",
    fontSize: 18,
  },
});

export default ConnectWallet;
