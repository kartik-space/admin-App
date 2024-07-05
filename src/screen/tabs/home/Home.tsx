import React, { useState } from 'react';
import {
  Image,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import OrderItem from '../../../components/cards/OrderCard';

const CategoryBox = ({
  imageSource,
  backgroundColor,
  textColor,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.boxContainer} onPress={onPress}>
    <View style={[styles.box, {backgroundColor}]}>
      <Image
        source={imageSource}
        style={styles.boxImage}
        resizeMode="contain"
      />
    </View>
    <Text style={[styles.boxLabel, {color: textColor}]}>{label}</Text>
  </TouchableOpacity>
);

const Home = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRate, setNewRate] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [vehicleRate, setVehicleRate] = useState('');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderData, setOrderData] = useState({
    totalOrders: 0,
    pendingRequests: 0,
  });

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleRateChange = () => {
    // Handle rate change logic here (e.g., update backend or local storage)
    setIsModalVisible(false); // Close the modal after rate change
  };

  const handleCategorySelect = category => {
    // Fetch or compute the order data for the selected category
    const data = {
      totalOrders: 50, // Replace with actual data fetching logic
      pendingRequests: 10, // Replace with actual data fetching logic
    };

    setSelectedCategory(category);
    setOrderData(data);
    setIsCategoryModalVisible(true);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../assets/images/menu.png')}
          style={styles.menuIcon}
        />
        <View>
          <Text style={styles.greetingText}>Hi,</Text>
          <Text style={styles.subGreetingText}>Let's Manage Your Booking</Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.categoryText}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <CategoryBox
            imageSource={require('../../../assets/images/smallCab.png')}
            backgroundColor="#bcf5f9"
            textColor="#017FD2"
            label="Cabs"
            onPress={() => handleCategorySelect('Cabs')}
          />
          <CategoryBox
            imageSource={require('../../../assets/images/ambulance.png')}
            backgroundColor="#FFE9EC"
            textColor="#EA7C8E"
            label="Ambulance"
            onPress={() => handleCategorySelect('Ambulance')}
          />
          <CategoryBox
            imageSource={require('../../../assets/images/courier.png')}
            backgroundColor="#F5DDFB"
            textColor="#AA336A"
            label="Courier"
            onPress={() => handleCategorySelect('Courier')}
          />
        </View>

        <View style={styles.rateContainer}>
          <View style={styles.rateTextContainer}>
            <Text style={styles.currRateText}>Your current rate is</Text>
            <Text style={styles.rateAmount}>Rs. 19/km for cabs</Text>
            <TouchableOpacity
              style={styles.changeRateButton}
              onPress={handleModalOpen}>
              <Text style={styles.changeRateText}>Change Rate</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rateImageContainer}>
            <Image
              source={require('../../../assets/images/money.png')}
              style={styles.rateImage}
            />
          </View>
        </View>

        <Text style={[styles.categoryText, {paddingTop: 20}]}>
          Today's Orders
        </Text>

        <OrderItem
          backgroundColor="#bcf5f9"
          imageSource={require('../../../assets/images/smallCab.png')}
          from="Patna(Bihar)"
          to="Palampur(Bihar)"
          time="4:30 pm"
          payment="COD"
          driver="Ajeet Singh"
        />
        <OrderItem
          backgroundColor="#F5DDFB"
          imageSource={require('../../../assets/images/courier.png')}
          from="Patna(Bihar)"
          to="Palampur(Bihar)"
          time="4:30 pm"
          payment="COD"
          driver="Ajeet Singh"
        />
        <OrderItem
          backgroundColor="#FFE9EC"
          imageSource={require('../../../assets/images/ambulance.png')}
          from="Patna(Bihar)"
          to="Palampur(Bihar)"
          time="4:30 pm"
          payment="COD"
          driver="Ajeet Singh"
        />
        <OrderItem
          backgroundColor="#bcf5f9"
          imageSource={require('../../../assets/images/smallCab.png')}
          from="Patna(Bihar)"
          to="Palampur(Bihar)"
          time="4:30 pm"
          payment="COD"
          driver="Ajeet Singh"
        />

        <TouchableOpacity
          style={{
            alignItems: 'center',
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.ViewMore}>View In Detail</Text>
          <Image
            source={require('../../../assets/images/next_blue.png')}
            style={{
              width: 23,
              height: 23,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Modal for Rate Change */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalClose}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Rate</Text>
              <TextInput
                style={styles.rateInput}
                placeholder="Enter new rate per km"
                onChangeText={text => setNewRate(text)}
                keyboardType="numeric"
              />
              <View style={styles.dropdown}>
                <Text style={styles.dropdownLabel}>Select Vehicle:</Text>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    selectedVehicle === 'Cab' && styles.selectedButton,
                  ]}
                  onPress={() => {
                    setSelectedVehicle('Cab');
                  }}>
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedVehicle === 'Cab' && styles.selectedText,
                    ]}>
                    Cab
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    selectedVehicle === 'Ambulance' && styles.selectedButton,
                  ]}
                  onPress={() => {
                    setSelectedVehicle('Ambulance');
                  }}>
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedVehicle === 'Ambulance' && styles.selectedText,
                    ]}>
                    Ambulance
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dropdownButton,
                    selectedVehicle === 'Courier' && styles.selectedButton,
                  ]}
                  onPress={() => {
                    setSelectedVehicle('Courier');
                  }}>
                  <Text
                    style={[
                      styles.dropdownText,
                      selectedVehicle === 'Courier' && styles.selectedText,
                    ]}>
                    Courier
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={handleModalClose}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={handleRateChange}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal for Category Details */}
      <Modal
        visible={isCategoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCategoryModalVisible(false)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedCategory} Orders</Text>
              <Text>Total Orders: {orderData.totalOrders}</Text>
              <Text
                style={{
                  paddingBottom: 10,
                }}>
                Pending Requests: {orderData.pendingRequests}
              </Text>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => setIsCategoryModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  paddingTop: 15,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 15,
                  }}>
                  view in detail...
                </Text>
                <Image
                  source={require('../../../assets/images/next_blue.png')}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F9F8FD',
  },
  headerContainer: {
    backgroundColor: '#000',
    padding: 18,
    borderBottomRightRadius: 50,
    height: 140,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  menuIcon: {
    height: 30,
    width: 30,
  },
  greetingText: {
    color: '#5A49CC',
    fontSize: 35,
    fontWeight: '500',
    fontFamily: 'notoserif',
  },
  subGreetingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 3,
  },
  contentContainer: {
    padding: 20,
  },
  categoryText: {
    color: '#000',
    fontSize: 20,
  },
  ViewMore: {
    color: '#5A49CC',
    fontSize: 17,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  boxContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    height: 110,
    width: 110,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  boxImage: {
    height: 90,
    width: 90,
  },
  boxLabel: {
    marginTop: 10,
    fontSize: 15,
  },
  rateContainer: {
    height: 170,
    backgroundColor: '#6D5DD4',
    borderRadius: 15,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  rateTextContainer: {
    width: '60%',
    paddingLeft: 20,
  },
  currRateText: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '600',
  },
  rateAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingBottom: 15,
  },
  changeRateButton: {
    width: '70%',
    backgroundColor: '#FC909D',
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeRateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rateImageContainer: {
    width: '40%',
  },
  rateImage: {
    width: 120,
    height: 120,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
    width: '100%',
  },
  dropdownLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#aaa',
  },
  saveButton: {
    backgroundColor: '#5A49CC',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedButton: {
    backgroundColor: '#5A49CC',
  },
  selectedText: {
    color: '#fff',
  },
});

export default Home;
