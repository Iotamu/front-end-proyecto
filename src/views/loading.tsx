import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); //4 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { display: isVisible ? 'flex' : 'none' }]}>
      <ActivityIndicator size="large" color="#9900ef" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;