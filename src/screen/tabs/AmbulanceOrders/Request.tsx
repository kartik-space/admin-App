import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import FilterTabs from '../../../components/filterTabs/FilterTabs';

const Requests = ({navigation}: any) => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = [
    { label: 'All' },
    { label: 'Today' },
    { label: 'Requested' },
    { label: 'Upcoming' },
    { label: 'Previous' },
  ];
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Ambulance Orders</Text>
        <Image source={require('../../../assets/images/orders_blue.png')} />
      </View>


      <FilterTabs
        filters={filters} 
        selectedFilter={selectedFilter} 
        onSelectFilter={setSelectedFilter} 
      />

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}></View>
    </ScrollView>
  );
};

export default Requests;

const styles = StyleSheet.create({
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
