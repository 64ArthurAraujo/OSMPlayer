import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { HoldItem } from 'react-native-hold-menu';
import { deleteSong, editSong, importASong, scanForSongs } from '../../../actions/song';
import { parsedSongs } from '../../../actions/song-parser';
import { Song } from '../../../types/song';
import Colors from '../../../util/colors';
import { border, font, globalStyles, margin, padding } from '../../../util/global-styles';
import { Info } from '../../../util/logger';
import SearchBar from './components/SearchBar';

export default function LibraryScreen({ navigation }) {
  const [songs, setSongs] = useState([] as Song[]);

  const searchFor = (text) => {
    Info('Function is yet to be implemented');
  };

  return (
    <View style={globalStyles.root} onLayout={async () => setSongs(await parsedSongs())}>
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
          onPress={async () => {
            ToastAndroid.show('Scanning might take a while!', ToastAndroid.SHORT);
            setSongs(await parsedSongs());
          }}
        >
          <Text style={[styles.buttonText]}>Scan for songs</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {songs?.map((song) => {
          const MenuItems = [
            { text: 'Actions', icon: 'home', isTitle: true, onPress: () => {} },
            { text: 'Edit', icon: 'edit', onPress: () => editSong(song.uuid) },
            {
              text: 'Delete',
              icon: 'trash',
              isDestructive: true,
              onPress: () => deleteSong(song.uuid),
            },
          ];

          return (
            <HoldItem key={song.uuid} items={MenuItems}>
              <TouchableOpacity style={[styles.songListElement]}>
                <View style={[styles.songImageView]}></View>
                <View style={[styles.songInfoView]}>
                  <Text style={[globalStyles.uiTextPrimary, styles.songTitle]}>
                    {textStandardiseLength(song.title)}
                  </Text>
                  <Text style={[globalStyles.uiTextSecondary, styles.songArtist]}>
                    {textStandardiseLength(song.artist ?? 'Unknown Artist')}
                  </Text>
                </View>
              </TouchableOpacity>
            </HoldItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

function textStandardiseLength(text: string) {
  if (text.length > 20) {
    return text.split(text.charAt(20))[0] + '...';
  } else return text;
}

const styles = StyleSheet.create({
  songInfoView: {
    alignSelf: 'flex-start',
    marginLeft: margin.s2,
    marginTop: margin.s2,
    flexDirection: 'column',
  },
  songArtist: {
    alignSelf: 'flex-start',
    fontSize: font.size.h4,
  },
  songTitle: {
    alignSelf: 'flex-start',
    fontSize: font.size.h4,
  },
  songImageView: {
    backgroundColor: Colors.black.almostGrey,
    width: 80,
    height: 80,
    marginLeft: margin.s2,
    borderRadius: border.s2,
  },
  songListElement: {
    backgroundColor: Colors.black.lightest,
    width: '95%',
    height: 100,
    alignSelf: 'center',
    marginTop: margin.s3,
    borderRadius: border.s1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addSong: {
    backgroundColor: Colors.black.darker,
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
