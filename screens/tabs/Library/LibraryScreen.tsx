import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { importASong, scanForSongs } from '../../../actions/song';
import Colors from '../../../util/colors';
import { border, font, globalStyles, margin, padding } from '../../../util/global-styles';
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

      <View style={[styles.addSong]}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.blue.regular }]}
          onPress={importASong}
        >
          <Text style={[styles.buttonText]}>Import a song</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.accent.regular }]}
          onPress={scanForSongs}
        >
          <Text style={[styles.buttonText]}>Scan for songs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addSong: {
    backgroundColor: Colors.black.lightest,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: margin.s3,
  },
  button: {
    borderRadius: border.s4,
  },
  buttonText: {
    paddingHorizontal: padding.s5,
    paddingVertical: padding.s2,
    color: Colors.white.darker,
    fontWeight: '600',
  },
});
