import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DriverSelectionModal from '../../../components/cards/DriverSelectionModal';
import OrderItem from '../../../components/cards/OrderCard';
import FilterTabs from '../../../components/filterTabs/FilterTabs';
import { orders } from '../../../data/Data.js';

// Import the orders array correctly

const Order = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentOrderId, setCurrentOrderId] = useState(null); // Store the current order id
  const [modalVisible, setModalVisible] = useState(false);

  const filters = [
    { label: 'All' },
    { label: 'Today' },
    { label: 'Requested' },
    { label: 'Upcoming' },
    { label: 'Previous' },
  ];

  // Filter only courier orders
  const courierOrders = orders.filter(order => order.type === 'Courier');

  // Function to categorize orders
  const categorizeOrders = () => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const upcomingOrders = [];
    const todayOrders = [];
    const requestedOrders = [];
    const previousOrders = [];

    courierOrders.forEach(order => {
      if (order.date === todayDate) {
        todayOrders.push(order);
      } else if (order.date > todayDate) {
        upcomingOrders.push(order);
      } else {
        previousOrders.push(order);
      }

      if (order.driver === 'Requested') {
        requestedOrders.push(order);
      }
    });

    return { upcomingOrders, todayOrders, requestedOrders, previousOrders };
  };

  const { upcomingOrders, todayOrders, requestedOrders, previousOrders } = categorizeOrders();

  const filterOrders = (filter) => {
    switch (filter) {
      case 'Today':
        return todayOrders;
      case 'Requested':
        return requestedOrders;
      case 'Upcoming':
        return upcomingOrders;
      case 'Previous':
        return previousOrders;
      case 'All':
      default:
        return courierOrders;
    }
  };

  const filteredOrders = filterOrders(selectedFilter);

  const handleAllotDriver = (orderId) => {
    setCurrentOrderId(orderId);
    setModalVisible(true);
  };

  const handleSelectDriver = (driver) => {
    console.log(`Driver ${driver} selected for order ${currentOrderId}`);
    setModalVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Courier Orders</Text>
        <Image source={require('../../../assets/images/orders_blue.png')} />
      </View>

      <FilterTabs
        filters={filters}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />

      <View style={styles.ordersContainer}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <View key={order.id}>
              <OrderItem
                backgroundColor={order.backgroundColor}
                imageSource={order.imageSource}
                from={order.from}
                to={order.to}
                date={order.date}
                time={order.time}
                payment={order.payment}
                driver={order.driver}
              />
              {order.driver === 'Requested' && (
                <TouchableOpacity
                  style={styles.allotDriverButton}
                  onPress={() => handleAllotDriver(order.id)}
                >
                  <Text style={styles.allotDriverButtonText}>Allot Driver</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noOrdersText}>No orders found.</Text>
        )}
      </View>

      <DriverSelectionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectDriver={handleSelectDriver}
      />
    </ScrollView>
  );
};

export default Order;

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: '#000',
    borderBottomRightRadius: 50,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  heading: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
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
    marginTop: 0,
    top: -10,
  },
  allotDriverButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
