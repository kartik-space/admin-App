import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAllotDriver } from '../../hooks/useAllotDriver';
import useAvailableDrivers from '../../hooks/useAvailableDrivers';

interface Driver {
  _id: string;
  name: string;
}

interface DriverSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDriver: (driver: Driver) => void;
  cabOrderId: string;
}

const DriverSelectionModal: React.FC<DriverSelectionModalProps> = ({
  visible,
  onClose,
  onSelectDriver,
  cabOrderId
}) => {
  const { availableDrivers, isLoading, error } = useAvailableDrivers();
  const { mutate: allotDriver, status: allotStatus } = useAllotDriver();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const handleDriverSelection = (driver: Driver) => {
    setSelectedDriver(driver);
  };

  const handleAllotDriver = () => {
    if (selectedDriver) {
      allotDriver(
        { driverId: selectedDriver._id, cabOrderId },
        {
          onSuccess: (response) => {
            console.log('Driver alloted response:', response);
            onSelectDriver(selectedDriver);
            onClose();
          },
          onError: (error) => {
            console.error('Failed to allot driver:', error);
          }
        }
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Image
              source={require('../../assets/images/cross.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
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
                  selectedDriver === driver && styles.selectedDriverButton
                ]}
                onPress={() => handleDriverSelection(driver)}
              >
                <Text
                  style={[
                    styles.driverName,
                    selectedDriver === driver && styles.selectedDriverName
                  ]}
                >
                  {driver.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
          {allotStatus === 'loading' && (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          <TouchableOpacity
            style={styles.allotButton}
            onPress={handleAllotDriver}
            disabled={!selectedDriver || allotStatus === 'loading'}
          >
            <Text style={styles.allotButtonText}>Allot Driver</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  closeImage: {
    width: 30,
    height: 30
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  driverButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  selectedDriverButton: {
    backgroundColor: '#4CAF50'
  },
  driverName: {
    fontSize: 18,
    color: '#333'
  },
  selectedDriverName: {
    color: '#fff'
  },
  allotButton: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  allotButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold'
  },
  errorText: {
    color: 'red',
    fontSize: 16
  }
});

export default DriverSelectionModal;
