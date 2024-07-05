import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterTabs = ({ filters, selectedFilter, onSelectFilter }) => {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.label}
            style={[
              styles.item,
              selectedFilter === filter.label ? styles.selectedItem : styles.unselectedItem
            ]}
            onPress={() => onSelectFilter(filter.label)}
          >
            <Text style={selectedFilter === filter.label ? styles.selectedText : styles.unselectedText}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  selectedItem: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
  },
  unselectedItem: {
    backgroundColor: '#000',
  },
  selectedText: {
    padding: 13,
    color: '#000',
    fontSize: 16,
    fontWeight: '300',
  },
  unselectedText: {
    padding: 13,
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
  },
});
