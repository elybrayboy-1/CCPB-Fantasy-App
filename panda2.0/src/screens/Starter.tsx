import { StyleSheet, Text, View } from 'react-native';

export default function Starter() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to CodePanda</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
