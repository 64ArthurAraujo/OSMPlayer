import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Colors from '../../../../util/colors';
import { border, font, margin, padding } from '../../../../util/global-styles';

export default function SearchBar({ placeholder, value, onChangeText }) {
  return (
    <TextInput
      style={styles.searchInput}
      onChangeText={onChangeText} // onType
      placeholder={placeholder}
      placeholderTextColor={Colors.white.darker}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: Colors.black.lightest,
    color: Colors.white.regular,
    fontSize: font.size.h4,
    width: '95%',
    padding: padding.s2,
    paddingLeft: padding.s4,
    borderRadius: border.s2,
    marginTop: margin.s2,
    alignSelf: 'center',
    fontWeight: '600',
  },
});
