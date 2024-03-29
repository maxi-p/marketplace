
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SellPage() {


    return (
        <View style={styles.container}>
            <View style={styles.middleContent}>
                <Text style={styles.middleText}>This is the sell page.</Text>
                {/* Add more text/content here as needed */}
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});