import React, { useState } from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const RateChangeModal = ({ isVisible, onClose, onRateChange }: any) => {
  const [newRate, setNewRate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);

  const handleRateChange = () => {
    onRateChange(newRate, selectedVehicle); 
    onClose(); 
  };

  const toggleVehicleOptions = () => {
    setShowVehicleOptions(!showVehicleOptions);
  };

  const selectVehicle = (vehicle : any) => {
    setSelectedVehicle(vehicle);
    toggleVehicleOptions();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Rate</Text>
            <TouchableOpacity
              style={styles.vehicleSelect}
              onPress={toggleVehicleOptions}>
              <Text style={styles.vehicleSelectText}>
                {selectedVehicle || 'Select vehicle category'}
              </Text>
              <View style={styles.dropdownIcon}>
                <Text>&#9660;</Text>
              </View>
            </TouchableOpacity>
            {showVehicleOptions && (
              <View style={styles.vehicleOptions}>
                {['ambulance', 'courier', 'sedan', 'hatchback', 'suv', 'bus'].map((vehicle) => (
                  <TouchableOpacity
                    key={vehicle}
                    style={styles.vehicleOption}
                    onPress={() => selectVehicle(vehicle)}>
                    <Text>{vehicle}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            <TextInput
              style={styles.rateInput}
              placeholder="Enter new rate"
              keyboardType="numeric"
              onChangeText={(text) => setNewRate(text)}
              value={newRate}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleRateChange}>
              <Text style={styles.modalButtonText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  vehicleSelect: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleSelectText: {
    color:'#000',
    fontSize: 16,
    fontWeight: '400'
  },
  dropdownIcon: {
    marginLeft: 10,
  },
  vehicleOptions: {
    marginTop: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    borderRadius: 10,
    padding: 10,
  },
  vehicleOption: {
    padding: 10,
  },
  rateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#5A49CC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#1D6EC3',
    fontSize: 16,
  },
});

export default RateChangeModal;
