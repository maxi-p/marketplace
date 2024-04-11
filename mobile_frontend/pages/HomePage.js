import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, BackHandler, Touchable } from 'react-native';
import { UserContext } from '../logic/UserContext';
import { useFocusEffect } from '@react-navigation/native';
const HomePage = (props) => {
  const { user } = useContext( UserContext );
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Handle logout logic here
    // setUsername(null);
    props.navigation.navigate('Login');
  };

  const handleSettings = () => {
    // Handle settings logic here
    props.navigation.navigate('Settings');
  }
  // Logout on Back button
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleLogout();
        return true;
      };
      const subscrip = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return ()=> subscrip.remove();
    }, [handleLogout])
  );

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <View style={styles.usernameContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text style={styles.username}>{user.username}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={dropdownVisible}
          onRequestClose={() => {
            setDropdownVisible(!dropdownVisible);
          }}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              onPress={toggleDropdown}
              style={styles.modalBackground}></TouchableOpacity>
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={handleSettings}>
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.dropdownText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>

      <View style={styles.middleContent}>
        <Text style={styles.middleText}>Welcome to Open Market</Text>
        {/* Add more text/content here as needed */}
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
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    width: '100%',
  },
  bannerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  bannerButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
  usernameContainer: {
    position: 'absolute',
    top: 50,
    right: 5,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dropdown: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default HomePage;
