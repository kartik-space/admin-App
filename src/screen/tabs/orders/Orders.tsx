import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OrderItem } from '../home/Home'; // Assuming OrderItem is a component to display each order

const Orders = ({ navigation }: any) => {
  // Sample orders data (replace with your actual data)
  const orders = [
    {
      id: 1,
      type: 'Cab',
      backgroundColor: '#bcf5f9',
      imageSource: require('../../../assets/images/smallCab.png'),
      from: 'Patna(Bihar)',
      to: 'Palampur(Bihar)',
      time: '4:30 pm',
      payment: 'COD',
      driver: 'Ajeet Singh',
      date: '2024-06-28',
    },
    {
      id: 2,
      type: 'Courier',
      backgroundColor: '#F5DDFB',
      imageSource: require('../../../assets/images/courier.png'),
      from: 'Patna(Bihar)',
      to: 'Palampur(Bihar)',
      time: '4:30 pm',
      payment: 'COD',
      driver: 'Ajeet Singh',
      date: '2024-06-28',
    },
    {
      id: 3,
      type: 'Ambulance',
      backgroundColor: '#FFE9EC',
      imageSource: require('../../../assets/images/ambulance.png'),
      from: 'Patna(Bihar)',
      to: 'Palampur(Bihar)',
      time: '4:30 pm',
      payment: 'COD',
      driver: 'Ajeet Singh',
      date: '2024-08-28',
    },
    {
      id: 4,
      type: 'Cab',
      backgroundColor: '#bcf5f9',
      imageSource: require('../../../assets/images/smallCab.png'),
      from: 'Ranchi(Jharkhand)',
      to: 'Jamshedpur(Jharkhand)',
      time: '11:00 am',
      payment: 'Online',
      driver: 'Ravi Kumar',
      date: '2024-06-29',
    },
    {
      id: 5,
      type: 'Courier',
      backgroundColor: '#F5DDFB',
      imageSource: require('../../../assets/images/courier.png'),
      from: 'Delhi',
      to: 'Mumbai',
      time: '2:00 pm',
      payment: 'Online',
      driver: 'Sandeep Sharma',
      date: '2024-07-05',
    },
    {
      id: 6,
      type: 'Ambulance',
      backgroundColor: '#FFE9EC',
      imageSource: require('../../../assets/images/ambulance.png'),
      from: 'Bangalore',
      to: 'Chennai',
      time: '8:45 am',
      payment: 'Insurance',
      driver: 'Priya Patel',
      date: '2024-07-15',
    },
    {
      id: 7,
      type: 'Cab',
      backgroundColor: '#bcf5f9',
      imageSource: require('../../../assets/images/smallCab.png'),
      from: 'Kolkata',
      to: 'Siliguri',
      time: '3:30 pm',
      payment: 'COD',
      driver: 'Sourav Das',
      date: '2024-06-15',
    },
    {
      id: 8,
      type: 'Courier',
      backgroundColor: '#F5DDFB',
      imageSource: require('../../../assets/images/courier.png'),
      from: 'Jaipur',
      to: 'Udaipur',
      time: '10:15 am',
      payment: 'Online',
      driver: 'Vikram Singh',
      date: '2024-06-18',
    },
    {
      id: 9,
      type: 'Ambulance',
      backgroundColor: '#FFE9EC',
      imageSource: require('../../../assets/images/ambulance.png'),
      from: 'Hyderabad',
      to: 'Vijayawada',
      time: '5:20 pm',
      payment: 'Insurance',
      driver: 'Manoj Kumar',
      date: '2024-06-20',
    },
  ];

  // Function to categorize orders
  const categorizeOrders = () => {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    const upcomingOrders = [];
    const todayOrders = [];
    const yesterdayOrders = [];
    const previousOrders = [];

    orders.forEach(order => {
      if (order.date === todayDate) {
        todayOrders.push(order);
      } else if (order.date > todayDate) {
        upcomingOrders.push(order);
      } else {
        const orderDate = new Date(order.date);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (
          orderDate.getDate() === yesterday.getDate() &&
          orderDate.getMonth() === yesterday.getMonth() &&
          orderDate.getFullYear() === yesterday.getFullYear()
        ) {
          yesterdayOrders.push(order);
        } else {
          previousOrders.push(order);
        }
      }
    });

    return { upcomingOrders, todayOrders, yesterdayOrders, previousOrders };
  };


  const { upcomingOrders, todayOrders, yesterdayOrders, previousOrders } = categorizeOrders();

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Total Orders</Text>
        <Image source={require("../../../assets/images/orders_blue.png")} />
      </View>

      <View style={{
        paddingHorizontal:20,
        paddingBottom:20
      }}>


      {upcomingOrders.length > 0 && (
        <>
          <View style={styles.headContainer}>
            <Text style={styles.categoryText}>Upcoming</Text>
            <Image
              source={require('../../../assets/images/down_white.png')}
              style={styles.headImage}
              tintColor="black"
            />
          </View>
          {upcomingOrders.map(order => (
            <OrderItem
              key={order.id}
              backgroundColor={order.backgroundColor}
              imageSource={order.imageSource}
              from={order.from}
              to={order.to}
              time={order.time}
              payment={order.payment}
              driver={order.driver}
            />
          ))}
        </>
      )}

      {todayOrders.length > 0 && (
        <>
          <View style={styles.headContainer}>
            <Text style={styles.categoryText}>Today</Text>
            <Image
              source={require('../../../assets/images/down_white.png')}
              style={styles.headImage}
              tintColor="black"
            />
          </View>
          {todayOrders.map(order => (
            <OrderItem
              key={order.id}
              backgroundColor={order.backgroundColor}
              imageSource={order.imageSource}
              from={order.from}
              to={order.to}
              time={order.time}
              payment={order.payment}
              driver={order.driver}
            />
          ))}
        </>
      )}

      {yesterdayOrders.length > 0 && (
        <>
          <View style={styles.headContainer}>
            <Text style={styles.categoryText}>Yesterday</Text>
            <Image
              source={require('../../../assets/images/down_white.png')}
              style={styles.headImage}
              tintColor="black"
            />
          </View>
          {yesterdayOrders.map(order => (
            <OrderItem
              key={order.id}
              backgroundColor={order.backgroundColor}
              imageSource={order.imageSource}
              from={order.from}
              to={order.to}
              time={order.time}
              payment={order.payment}
              driver={order.driver}
            />
          ))}
        </>
      )}

      {previousOrders.length > 0 && (
        <>
          <View style={styles.headContainer}>
            <Text style={styles.categoryText}>Previous</Text>
            <Image
              source={require('../../../assets/images/down_white.png')}
              style={styles.headImage}
              tintColor="black"
            />
          </View>
          {previousOrders.map(order => (
            <OrderItem
              key={order.id}
              backgroundColor={order.backgroundColor}
              imageSource={order.imageSource}
              from={order.from}
              to={order.to}
              time={order.time}
              payment={order.payment}
              driver={order.driver}
            />
          ))}
        </>
      )}
      </View>
    </ScrollView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  categoryText: {
    color: '#000',
    fontSize: 20,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headImage: {
    width: 20,
    height: 20,
  },
  header:{
    height:140,
    backgroundColor:'#000',
    borderBottomRightRadius:50,
    padding:50,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  heading:{
    color:'#fff',
    fontSize:25,
    fontWeight:'600'
  }
});
