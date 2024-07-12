import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AmbulanceOrders from '../screen/tabs/AmbulanceOrders/Request';
import CabOrders from '../screen/tabs/CabOrders/Orders';
import CourierOrders from '../screen/tabs/courier/Order';
import Home from '../screen/tabs/home/Home';
import More from '../screen/tabs/more/More';

import ambulance from "../assets/images/ambulance_icon.png";
import home from "../assets/images/home.png";
import menu from "../assets/images/menu.png";
import courier from "../assets/images/motorbike.png";
import orders from "../assets/images/orders.png";
import AllDrivers from '../screen/menu-screens/AllDrivers';
import TotalOrders from '../screen/orders/TotalOrders';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({ focused, icon, size }) {
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
      <Image
        source={icon}
        style={[
          styles.tabBarIconStyle,
          { tintColor: focused ? 'white' : '#000', width: size, height: size },
        ]}
      />
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === 'Home') {
            icon = home;
          } else if (route.name === 'Cab') {
            icon = orders;
          } else if (route.name === 'Ambulance') {
            icon = ambulance;
          } else if (route.name === 'Courier') {
            icon = courier;
          } else if (route.name === 'Menu') {
            icon = menu;
          }

          return <TabBarIcon focused={focused} icon={icon} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Cab" component={CabOrders} options={{ headerShown: false }} />
      <Tab.Screen name="Ambulance" component={AmbulanceOrders} options={{ headerShown: false }} />
      <Tab.Screen name="Courier" component={CourierOrders} options={{ headerShown: false }} />
      <Tab.Screen name="Menu" component={More} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
      <Stack.Screen name="AllOrders" component={TotalOrders} />
      <Stack.Screen name="AllDrivers" component={AllDrivers} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    fontFamily: 'Poppins-Bold',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
  },
  tabBarIconStyle: {},
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35, // Adjust as needed
    height: 35, // Adjust as needed
    borderRadius: 25, // Half of width and height for circle
    backgroundColor: 'transparent', // Initial background color
  },
  tabIconContainerFocused: {
    backgroundColor: 'black', 
  },
});
