import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useBluetooth } from 'rn-bluetooth-classic';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SettingsPage = ({ navigation }) => {
  const { scanDevices, devices, connectToDevice } = useBluetooth();
  const [scannedDevices, setScannedDevices] = useState([]);

  useEffect(() => {
    try {
      scanDevices();
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    console.log('Discovered Devices:', devices);
    setScannedDevices(devices); // Update scannedDevices state
  }, [devices]); 

  const handleConnectToScale = (deviceAddress) => {
    console.log('Connecting to device', deviceAddress);
    connectToDevice(deviceAddress);
  };

  const handleConnectToPrinter = () => {
    if (scannedDevices.length > 0) {
      connectToDevice(scannedDevices[0].address); // Connect to the first scanned device
      console.log('Connected to printer');
    } else {
      console.log('No devices found');
    }
  };

  const handleSignOut = () => {
    console.log('Sign Out button pressed');
    navigation.navigate('LoginPage');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => handleConnectToScale(scannedDevices[0]?.address)}>
        <Text style={styles.buttonText}>Connect to Scale</Text>
        <FontAwesome6 name="weight-scale" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleConnectToPrinter}>
        <Text style={styles.buttonText}>Connect to Printer</Text>
        <AntDesign name="printer" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
          <MaterialCommunityIcons name="logout" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 70,
    width: screenWidth,
    height: screenHeight,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    marginRight: 20,

  },
  signOutContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  signOutButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    color: '#FF0000',
    fontSize: 18,
    marginRight: 10,
    fontFamily: 'Poppins-Regular',  },
});

export default SettingsPage;
