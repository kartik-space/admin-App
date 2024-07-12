import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDrivers } from '../../hooks/useDrivers';

const DriverInfo = ({ name, details, status, onPress }: { name: string; details: string; status: string; onPress: () => void }) => {
  const statusStyle = status === 'Active' ? styles.statusActive : styles.statusInactive;

  return (
    <TouchableOpacity style={styles.driverContainer} onPress={onPress}>
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>{name}</Text>
        <Text style={styles.driverDetails}>{details}</Text>
      </View>
      <View style={[styles.statusContainer, statusStyle]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const AllDrivers = ({ navigation }: { navigation: any }) => {
  const { data: drivers, isLoading, isError, refetch } = useDrivers();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleDriverPress = (driver: any) => {
    setSelectedDriver(driver);
    setModalVisible(true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading drivers</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SafeAreaView style={styles.container}>
        {/* Circular Back Button */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image style={styles.backIcon} source={require('../../assets/images/back-arrow-50.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>All Drivers</Text>
        </View>
        <View style={styles.horizontalBar} />

        {drivers.map((driver: any) => (
          <DriverInfo
            key={driver._id}
            name={driver.name}
            details={`${driver.carModel} - ${driver.carNumber}`}
            status={driver.status ? 'Active' : 'Inactive'}
            onPress={() => handleDriverPress(driver)}
          />
        ))}

        {selectedDriver && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{selectedDriver.name}</Text>
                <Text style={styles.modalText}>Phone: {selectedDriver.phone}</Text>
                <Text style={styles.modalText}>Car Number: {selectedDriver.carNumber}</Text>
                <Text style={styles.modalText}>Driving License: {selectedDriver.drivingLicense}</Text>
                <Text style={styles.modalText}>Aadhaar Card: {selectedDriver.aadhaarCard}</Text>
                <Text style={styles.modalText}>Employment Type: {selectedDriver.employmentType}</Text>
                <Text style={styles.modalText}>Car Type: {selectedDriver.carType}</Text>
                <Text style={styles.modalText}>Car Model: {selectedDriver.carModel}</Text>
                <Text style={styles.modalText}>Car Year: {selectedDriver.carYear}</Text>
                <Text style={styles.modalText}>Status: {selectedDriver.status ? 'Active' : 'Inactive'}</Text>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverInfo: {
    flexDirection: 'column',
  },
  driverName: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  driverDetails: {
    color: '#777',
    fontSize: 14,
  },
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  statusActive: {
    backgroundColor: '#28a745', // Green background for active status
  },
  statusInactive: {
    backgroundColor: '#ec77a0', // Pink background for inactive status
  },
  statusText: {
    color: '#000',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color:"#000",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#000',
    width: 120, 
    alignItems: 'center', 
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AllDrivers;
