import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const GoogleLogin: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '179307589523-acrusv8defhg2lq7n9sf6b81p43mippv.apps.googleusercontent.com', // Web client ID
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      console.log("Login successfully!");

      // Send user email to backend
      await sendUserEmailToBackend(userInfo.user.email);

      navigation.navigate('ProposalScreen'); // Giriş başarılı olduğunda yönlendirme yap
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Operation is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('Play services not available or outdated');
      } else {
        // some other error happened
        console.log('Some other error happened', error);
      }
    }
  };

  const sendUserEmailToBackend = async (email: string | null) => {
    if (!email) {
      console.error('Email not found');
      return;
    }
    
    try {
      const response = await fetch('https://6204-95-12-113-153.ngrok-free.app/mobile/sso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Failed to send email to backend');
      }
      console.log('Email sent to backend successfully');
    } catch (error) {
      console.error('Error sending email to backend:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={signIn} style={styles.button}>
          <View style={styles.buttonContent}>
            <Image source={require('../assets/googlelogo.png')} style={styles.icon} resizeMode="contain" />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Genişlik ayarı
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#fff', // Google renk örneği
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Butonlar arası boşluk
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GoogleLogin;
