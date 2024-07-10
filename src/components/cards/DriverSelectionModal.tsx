import React, { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAllotDriver } from '../../hooks/useAllotDriver';
import useAvailableDrivers from '../../hooks/useAvailableDrivers';

const DriverSelectionModal = ({ visible, onClose, onSelectDriver, cabOrderId }) => {
  const { availableDrivers, isLoading, error } = useAvailableDrivers();
  const { mutate: allotDriver, isLoading: isAllotting } = useAllotDriver();
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverSelection = (driver) => {
    setSelectedDriver(driver);
    allotDriver({ driverId: driver._id, cabOrderId }, {
      onSuccess: (response) => {
        console.log('Driver alloted response:', response);
        onSelectDriver(driver);
      },
      onError: (error) => {
        console.error('Failed to allot driver:', error);
      },
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Driver</Text>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : error ? (
            <Text style={styles.errorText}>Error: {error.message}</Text>
          ) : (
            availableDrivers?.map((driver) => (
              <TouchableOpacity
                key={driver._id}
                style={[
                  styles.driverButton,
                  selectedDriver === driver && styles.selectedDriverButton,
                ]}
                onPress={() => handleDriverSelection(driver)}
              >
                <Text
                  style={[
                    styles.driverName,
                    selectedDriver === driver && styles.selectedDriverName,
                  ]}
                >
                  {driver.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
          {isAllotting && <ActivityIndicator size="small" color="#0000ff" />}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  driverButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedDriverButton: {
    backgroundColor: '#4CAF50',
  },
  driverName: {
    fontSize: 18,
    color: '#333',
  },
  selectedDriverName: {
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default DriverSelectionModal;
