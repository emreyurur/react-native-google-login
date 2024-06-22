import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button, Text, View } from 'react-native';
import { GoogleSignin, statusCodes, User } from '@react-native-google-signin/google-signin';

const App = () => {
  const [userInfo, setUserInfo] = React.useState<User | null>(null);

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
      console.log("Login succesfully!")
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
            <Button title="Sign Out" onPress={signOut} />
          </View>
        ) : (
          <Button title="Sign In with Google" onPress={signIn} />
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
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default App;