import React from 'react';
import { View, Text, StyleSheet, AppRegistry } from 'react-native';

console.log('index.tsx is loading...');

const App: React.FC = () => {
  console.log('App component is rendering');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World from React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

console.log('Registering component "main"');
AppRegistry.registerComponent('main', () => App);
console.log('Component "main" registered');

export default App;
