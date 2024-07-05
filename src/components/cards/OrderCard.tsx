import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const DetailRow = ({ label, value }) => (
    <View style={styles.detailRowContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );

const OrderItem = ({ backgroundColor, imageSource, from, to,date , time, payment, driver }) => (
  
  <View style={[styles.orderItemContainer, { backgroundColor }]}>
      <View style={styles.orderItemLeft}>
        <DetailRow label="From :" value={from} />
        <DetailRow label="To :" value={to} />
        <DetailRow label="Date :" value={date} />
        <DetailRow label="Time :" value={time} />
        <DetailRow label="Payment :" value={payment} />
        <DetailRow label="Driver :" value={driver} />
      </View>
      <View style={styles.orderItemImageContainer}>
        <Image
          source={imageSource}
          style={styles.orderItemImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  export default OrderItem;


  const styles = StyleSheet.create({
    orderItemContainer: {
        backgroundColor: '#bcf5f9',
        height: 180,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
      },
      orderItemLeft: {
        width: '70%',
        paddingLeft: 20,
      },
      detailRowContainer :{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
      },
      detailLabel:{
        color: '#000',
        fontSize: 17,
        fontWeight: '500',
      },
      detailValue:{
        color: '#000',
        fontSize: 14,
      },
      orderItemImageContainer:{
        width: '30%',
      },
      orderItemImage: {
        width: 90,
        height: 80,
      },
  })