import React from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const AllDrivers = ({navigation}: {navigation: any}) => {
  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* Circular Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/images/back-arrow-50.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>All Drivers</Text>
      </View>
      <View style={styles.horizontalBar} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: 'blue',
            }}>
            Kartik Sharma
          </Text>
          <Text
            style={{
              color: 'blue',
            }}>
            HP 37F 4809
          </Text>
        </View>

        <View
          style={{
            height: 'auto',
            backgroundColor: '#ef8daf',
            padding: 5,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            Inactive
          </Text>
        </View>
      </View>
      <View style={styles.horizontalBar2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Poppins-ExtraBold',
  },
  horizontalBar: {
    marginVertical: 20,
    height: 2,
    backgroundColor: '#ccc',
  },
  horizontalBar2: {
    marginVertical: 20,
    height: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 20,
  },
});

export default AllDrivers;
