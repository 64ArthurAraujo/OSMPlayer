import React from 'react';
import { View, Text } from 'react-native';
import { font, globalStyles } from '../../../util/global-styles';
import SearchBar from './components/SearchBar';

export default function LibraryScreen({ navigation }) {
  const searchFor = (text) => {
    console.info('Function is yet to be implemented');
  };

  return (
    <View style={globalStyles.root}>
      <View style={globalStyles.header}>
        <Text style={[globalStyles.uiTextPrimary, { fontSize: font.size.h3 }]}>Library</Text>
      </View>

      <SearchBar
        placeholder='Search in your library...'
        value={undefined}
        onChangeText={(text) => searchFor(text)}
      />
    </View>
  );
}
