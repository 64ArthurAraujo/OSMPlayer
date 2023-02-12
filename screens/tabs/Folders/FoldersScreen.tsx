import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { importASong, scanForSongs } from '../../../actions/song';
import Colors from '../../../util/colors';
import { border, font, globalStyles, padding } from '../../../util/global-styles';

export default function FoldersScreen({ navigation }) {
  return (
    <View style={globalStyles.root}>
      <View style={globalStyles.header}>
        <Text style={[globalStyles.uiTextPrimary, { fontSize: font.size.h3 }]}>Folders</Text>
      </View>

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

      <ScrollView>
        {[]?.map((path) => {
          return <Text style={globalStyles.uiTextPrimary}></Text>;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  addSong: {
    backgroundColor: Colors.black.darker,
    width: '100%',
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
