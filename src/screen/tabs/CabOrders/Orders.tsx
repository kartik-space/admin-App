import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DriverSelectionModal from '../../../components/cards/DriverSelectionModal';
import OrderCard from '../../../components/cards/OrderCard';
import FilterTabs from '../../../components/filterTabs/FilterTabs';
import useCabOrders from '../../../hooks/useCabOrders';
import { getAddressFromCoordinates } from '../../../utils/geocoding';

interface Order {
  _id: string;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  startAddress: string;
  endAddress: string;
  date: string;
  time: string;
  driver: string;
  status: string;
  user: {
    name: string;
    phoneNo: string;
  };
}

const Orders: React.FC<{navigation: any}> = ({navigation}) => {
  // State variables
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {cabOrders, isLoading, error, refetch} = useCabOrders();
  const [ordersWithAddresses, setOrdersWithAddresses] = useState<Order[]>([]);
  const [originalOrders, setOriginalOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null); // State for selected driver ID

  // Effects
  useEffect(() => {
    if (cabOrders) {
      fetchAddresses();
    }
  }, [cabOrders]);

  useEffect(() => {
    filterOrders(selectedFilter);
  }, [ordersWithAddresses, selectedFilter]);

  useEffect(() => {
    if (selectedDriverId) {
      refetch();
    }
  }, [selectedDriverId, refetch]);

  // Fetch addresses for orders
  const fetchAddresses = async () => {
    try {
      const updatedOrders = await Promise.all(
        cabOrders.map(async order => {
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
      setOrdersWithAddresses(updatedOrders);
      setOriginalOrders(updatedOrders); // Store original orders separately
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setRefreshing(false); // Ensure refreshing state is set to false after completion
    }
  };

  // Helper function to parse date string in "DD/MM/YYYY" format
  const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  // Filter orders based on selected filter
  const filterOrders = (filter: string) => {
    let filtered: Order[];
    const today = new Date();
    switch (filter) {
      case 'Today':
        filtered = originalOrders.filter(order => {
          const orderDate = parseDate(order.date);
          return orderDate.toDateString() === today.toDateString();
        });
        break;
      case 'Requested':
        filtered = originalOrders.filter(order => order.status === 'REQUESTED');
        break;
      case 'Upcoming':
        filtered = originalOrders.filter(order => {
          const orderDate = parseDate(order.date);
          return orderDate > today;
        });
        break;
      case 'Previous':
        filtered = originalOrders.filter(order => {
          const orderDate = parseDate(order.date);
          return orderDate < today;
        });
        break;
      default:
        filtered = originalOrders;
        break;
    }
    setFilteredOrders(filtered);
  };

  // Handle allotting a driver to an order
  const handleAllotDriver = (orderId: string) => {
    setCurrentOrderId(orderId);
    setModalVisible(true);
  };

  const handleSelectDriver = driver => {
    setSelectedDriverId(driver._id);
    setModalVisible(false);
    setCurrentOrderId(null);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
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

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#0000ff']}
          tintColor="#0000ff"
        />
      }>
      <View style={styles.header}>
        <Text style={styles.heading}>Cab Orders</Text>
        <Image source={require('../../../assets/images/orders_blue.png')} />
      </View>

      <FilterTabs
        filters={[
          {label: 'All'},
          {label: 'Today'},
          {label: 'Requested'},
          {label: 'Upcoming'},
          {label: 'Previous'},
        ]}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <View style={styles.ordersContainer}>
        {error ? (
          <Text>Error: {error.message}</Text>
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map((order: Order) => (
            <View key={order._id}>
              <OrderCard
                from={order.startAddress}
                to={order.endAddress}
                date={order.date}
                time={order.time}
                driver={order.driver ? order.driver.name : 'No Driver'} 
                userName={order.user.name}
                status={order.status}
                phoneNo={order.user.phoneNo} // Ensure phone number is passed here
                onPressAllotDriver={() => handleAllotDriver(order._id)}
              />
              {order.status === 'REQUESTED' && (
                <TouchableOpacity
                  style={styles.allotDriverButton}
                  onPress={() => handleAllotDriver(order._id)}>
                  <Text style={styles.allotDriverButtonText}>Allot Driver</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found.</Text>
        )}
      </View>
      {modalVisible && currentOrderId && (
        <DriverSelectionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectDriver={handleSelectDriver}
          cabOrderId={currentOrderId}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  ordersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
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
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Orders;
