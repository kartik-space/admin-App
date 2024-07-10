import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CategoryDetailsModal = ({ isVisible, onClose, category, orderData, onViewDetail } : any) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{category}</Text>
          <Text style={styles.modalText}>
            Total Orders: {orderData.totalOrders}
          </Text>
          <Text style={styles.modalText}>
            Pending Requests: {orderData.pendingRequests}
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={onViewDetail}>
            <Text style={styles.modalButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  modalText: {
    color:'#201f1f',
    fontSize: 16,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#5A49CC',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
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

export default CategoryDetailsModal;
