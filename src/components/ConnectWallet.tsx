import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the navigation prop type
type RootStackParamList = {
  ProposalScreen: { proposals: Proposal[] };
};

type ConnectWalletNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProposalScreen'>;

interface Proposal {
  proposal_uuid: string;
  title: string;
  description: string;
}

const ConnectWallet: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useNavigation<ConnectWalletNavigationProp>();

  const handleConnectPhantom = async () => {
    // Static public key to be sent
    const staticPublicKey = 'Af139PJn2nuCBA7vJQeuZfZHskXogyuhZVFvD2dPBg5q';

    // Open Phantom connection URL
    const params = new URLSearchParams({
      dapp_encryption_public_key: staticPublicKey,
      cluster: 'mainnet-beta', // or 'testnet'
      app_url: 'https://phantom.app',
      redirect_link: 'myapp://onConnect', // Make sure this matches your scheme
    });

    const connectUrl = `phantom://v1/connect?${params.toString()}`;

    try {
      // Open the Phantom wallet connection URL
      await Linking.openURL(connectUrl);

      // Fetch proposals after sending the public key
      fetchProposals(staticPublicKey);
    } catch (error) {
      console.error('Error connecting to Phantom or sending public key:', error);
    }
  };

  const fetchProposals = async (publicKey: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://6204-95-12-113-153.ngrok-free.app/mobile/getProposals?pubkey=2nKqT2P4DdH8Dr8hw8zHMgFgAnDXNYsDiB9hjCw9ZnEL', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicKey}`, // Include the public key in headers if needed
        },
      });

      if (response.ok) {
        const data: Proposal[] = await response.json();
        console.log('Proposals fetched successfully:', data);

        // Navigate to ProposalScreen with fetched proposals
        navigation.navigate('ProposalScreen', { proposals: data });
      } else {
        console.error('Failed to fetch proposals', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={handleConnectPhantom} style={styles.button}>
          <View style={styles.buttonContent}>
            <Image source={require('../assets/phantomcircle.png')} style={styles.icon} resizeMode="contain" />
            <Text style={styles.buttonText}>Connect Phantom</Text>
          </View>
        </TouchableOpacity>
        {loading && <Text>Loading proposals...</Text>}
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
    backgroundColor: '#874CCC', // Example color
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
    marginRight: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConnectWallet;
