import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DriverSelectionModal from '../../../components/cards/DriverSelectionModal';
import OrderCard from '../../../components/cards/OrderCard';
import useHomeCardOrders from '../../../hooks/useHomeCardOrders';
import { getAddressFromCoordinates } from '../../../utils/geocoding';

interface CategoryBoxProps {
  imageSource: any;
  backgroundColor: string;
  textColor: string;
  label: string;
  onPress: () => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
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

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [isRateModalVisible, setIsRateModalVisible] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderData, setOrderData] = useState({
    totalOrders: 0,
    pendingRequests: 0,
  });

  // Additional state variables
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const {homeCardOrders, isLoading, error, refetch} = useHomeCardOrders();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const updatedOrders = await Promise.all(
          homeCardOrders?.fiveMostRecentOrders.map(async (order: any) => {
            const startAddress = await getAddressFromCoordinates(
              order.start.latitude,
              order.start.longitude,
            );
            const endAddress = await getAddressFromCoordinates(
              order.end.latitude,
              order.end.longitude,
            );
            return {...order, startAddress, endAddress};
          }),
        );
        setFilteredOrders(updatedOrders);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    if (homeCardOrders && homeCardOrders.fiveMostRecentOrders) {
      fetchAddresses();
    }
  }, [homeCardOrders]);

  // Handlers for modals
  const handleRateModalOpen = () => {
    setIsRateModalVisible(true);
  };

  const handleRateModalClose = () => {
    setIsRateModalVisible(false);
  };

  const handleRateChange = (newRate: number) => {
    // Implement rate change logic here
    console.log('New rate:', newRate);
    // Close the modal
    handleRateModalClose();
  };

  const handleCategoryModalOpen = () => {
    setIsCategoryModalVisible(true);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalVisible(false);
  };

  const handleAllotDriver = (orderId: string) => {
    setCurrentOrderId(orderId);
    setModalVisible(true);
  };

  const handleSelectDriver = (driver: string) => {
    console.log(`Driver ${driver} selected for order ${currentOrderId}`);
    setModalVisible(false);
    // Implement logic to assign driver to order
  };

  const handleViewDetail = () => {
    if (selectedCategory === 'Cabs') {
      navigation.navigate('Cab');
    } else if (selectedCategory === 'Ambulance') {
      navigation.navigate('Ambulance');
    } else if (selectedCategory === 'Courier') {
      navigation.navigate('Courier');
    }
    setIsCategoryModalVisible(false);
  };

  // Function to handle refresh action
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); // Set refreshing state to true
    // Trigger data refetch
    refetch()
      .then(() => {
        // Success
        console.log('Data refetched successfully.');
      })
      .catch(error => {
        // Error handling
        console.error('Error refetching data:', error);
      })
      .finally(() => {
        setRefreshing(false); // Ensure refreshing state is set to false after completion
      });
  }, [refetch]);

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }>
      <SafeAreaView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={{padding: 10}}>
            <Text style={styles.greetingText}>Hi,</Text>
            <Text style={styles.subGreetingText}>
              Let's Manage Your Booking
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView>
        {/* Main Content Section */}
        <View style={styles.contentContainer}>
          {/* Categories Section */}
          <Text style={styles.categoryText}>Categories</Text>
          <ScrollView
            horizontal={true}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContainer}>
            <CategoryBox
              imageSource={require('../../../assets/images/smallCab.png')}
              backgroundColor="#bcf5f9"
              textColor="#017FD2"
              label="Cabs"
              onPress={() => {
                setSelectedCategory('Cabs');
                setIsCategoryModalVisible(true);
              }}
            />
            <CategoryBox
              imageSource={require('../../../assets/images/ambulance.png')}
              backgroundColor="#FFE9EC"
              textColor="#EA7C8E"
              label="Ambulance"
              onPress={() => {
                setSelectedCategory('Ambulance');
                setIsCategoryModalVisible(true);
              }}
            />
            <CategoryBox
              imageSource={require('../../../assets/images/courier.png')}
              backgroundColor="#F5DDFB"
              textColor="#AA336A"
              label="Courier"
              onPress={() => {
                setSelectedCategory('Courier');
                setIsCategoryModalVisible(true);
              }}
            />
          </ScrollView>

          {/* Rate Section */}
          <SafeAreaView style={styles.rateContainer}>
            <View style={styles.rateTextContainer}>
              <Text style={styles.currRateText}>Your current rate is</Text>
              <Text style={styles.rateAmount}>Rs. 19/km for cabs</Text>
              <TouchableOpacity
                style={styles.changeRateButton}
                onPress={handleRateModalOpen}>
                <Text style={styles.changeRateText}>Change Rate</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rateImageContainer}>
              <Image
                source={require('../../../assets/images/money.png')}
                style={styles.rateImage}
              />
            </View>
          </SafeAreaView>

          {/* Today's Orders Section */}
          <Text style={[styles.categoryText, {paddingTop: 20}]}>
            Today's Orders
          </Text>

          <SafeAreaView style={styles.ordersContainer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : error ? (
              <Text>Error: {error.message}</Text>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <View key={order._id}>
                  <OrderCard
                    from={order.startAddress}
                    to={order.endAddress}
                    date={order.date}
                    time={order.time}
                    driver={order.driver.name}
                    userName={order.user.name}
                    status={order.status}
                    phoneNo={order.user.phoneNo} 
                    onPressAllotDriver={() => handleAllotDriver(order._id)}
                  />
                  {order.status === 'REQUESTED' && (
                    <TouchableOpacity
                      style={styles.allotDriverButton}
                      onPress={() => handleAllotDriver(order._id)}>
                      <Text style={styles.allotDriverButtonText}>
                        Allot Driver
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noOrdersText}>No orders found.</Text>
            )}
          </SafeAreaView>

          {/* View More Orders Section */}
          <TouchableOpacity
            style={{
              alignItems: 'center',
              paddingTop: 3,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('AllOrders')}>
              <Text style={styles.ViewMore}>View In Detail</Text>
            </TouchableOpacity>
            <Image
              source={require('../../../assets/images/next_blue.png')}
              style={{
                width: 23,
                height: 23,
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modals */}
      <DriverSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectDriver={handleSelectDriver}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F9F8FD',
    height: 'auto',
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  ordersContainer: {
    paddingBottom: 20,
  },
  allotDriverButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderRadius: 10,
    marginTop: -4,
  },
  allotDriverButtonText: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  headerContainer: {
    backgroundColor: '#000',
    padding: 18,
    borderBottomRightRadius: 50,
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 35,
  },
  greetingText: {
    color: '#5A49CC',
    fontSize: 35,
    fontWeight: '500',
    fontFamily: 'popins, notoserif',
  },
  subGreetingText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 15,
    marginTop: 3,
  },
  contentContainer: {
    padding: 20,
  },
  categoryText: {
    color: '#000',
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
  },
  ViewMore: {
    color: '#5A49CC',
    fontSize: 17,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
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
    fontFamily: 'Poppins-SemiBold',
    marginTop: 10,
    fontSize: 15,
  },
  rateContainer: {
    padding: 15,
    height: 150,
    backgroundColor: '#6D5DD4',
    borderRadius: 15,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rateTextContainer: {
    // width: '60%',
  },
  currRateText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  rateAmount: {
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
    fontSize: 16,
    paddingBottom: 15,
  },
  changeRateButton: {
    width: '70%',
    padding: 8,
    backgroundColor: '#FC909D',
    height: '30%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeRateText: {
    fontFamily: 'Poppins-ExtraBold',
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  rateImageContainer: {
    // width: '40%',
  },
  rateImage: {
    width: 110,
    height: 110,
  },
});

export default Home;
