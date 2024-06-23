import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View, Image,TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';

const GoogleLogin: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

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

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remove the user info
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {userInfo ? (
          <View>
            <Text style={styles.text}>Welcome, {userInfo.user.name}</Text>
            <Button title="Sign Out" onPress={signOut} style={styles.button} />
          </View>
        ) : (
          <TouchableOpacity onPress={signIn} style={styles.button}>
            <View style={styles.buttonContent}>
              <Image source={require('../assets/googlelogo.png')} style={styles.icon} resizeMode="contain" />
              <Text style={styles.buttonText}>Sign In with Google</Text>
            </View>
          </TouchableOpacity>
        )}
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
    width:300,
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default GoogleLogin;
