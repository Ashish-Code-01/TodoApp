import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './main';

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
});

export default Page;
