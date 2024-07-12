import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const More = ({ navigation }: { navigation: any }) => {
  const navigateToAllDrivers = () => {
    navigation.navigate('AllDrivers'); // Replace 'AllDrivers' with your actual screen name
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Menu</Text>
        <TouchableOpacity onPress={() => console.log('Settings pressed')}>
          <Image
            style={styles.settingsIcon}
            source={require('../../../assets/images/settings_478563.png')}
          />
        </TouchableOpacity>
      </View>

      {/* Driver's List */}
      <TouchableOpacity
        style={styles.listItem}
        onPress={navigateToAllDrivers}
      >
        <View style={styles.listItemContent}>
          <Image
            style={styles.listIcon}
            source={require("../../../assets/images/list.png")}
          />
          <Text style={styles.listText}>Driver's List</Text>
        </View>
        <Image
          style={styles.nextIcon}
          source={require("../../../assets/images/next_blue.png")}
        />
      </TouchableOpacity>

      {/* Horizontal bar */}
      <View style={styles.horizontalBar} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 120,
    backgroundColor: '#000',
    borderBottomRightRadius: 50,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    marginRight: 10,
  },
  settingsIcon: {
    width: 35,
    height: 35,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical:5
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIcon: {
    width: 35,
    height: 35,
  },
  listText: {
    fontSize: 20,
    color: "#000",
    fontFamily: 'Poppins-ExtraBold',
    marginLeft: 10,
  },
  nextIcon: {
    width: 30,
    height: 30,
  },
  horizontalBar: {
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  },
});

export default More;
