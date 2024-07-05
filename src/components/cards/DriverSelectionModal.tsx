import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const drivers = ['Driver 1', 'Driver 2', 'Driver 3']; // Example driver list

const DriverSelectionModal = ({ visible, onClose, onSelectDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverSelection = (driver) => {
    setSelectedDriver(driver);
    onSelectDriver(driver);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a Driver</Text>
          {drivers.map((driver, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.driverButton,
                selectedDriver === driver && styles.selectedDriverButton,
              ]}
              onPress={() => handleDriverSelection(driver)}>
              <Text style={[
                styles.driverName,
                selectedDriver === driver && styles.selectedDriverName,
              ]}>{driver}</Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  driverButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff', // Default background color
    marginBottom: 10,
    borderRadius: 5,
  },
  selectedDriverButton: {
    backgroundColor: '#000', // Selected background color
  },
  driverName: {
    fontSize: 18,
    color: '#333', // Default text color
  },
  selectedDriverName: {
    color: '#fff', // Selected text color
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#000', // Close button background color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DriverSelectionModal;
