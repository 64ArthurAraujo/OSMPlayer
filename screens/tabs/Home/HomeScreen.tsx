import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { lastPlayedSong, randomSong, songsMarkedAsFavorite } from '../../../actions/song';
import Colors from '../../../util/colors';
import { border, font, globalStyles, margin } from '../../../util/global-styles';

export default function HomeScreen({ navigation }) {
  const songShow = lastPlayedSong() ?? randomSong();
  const favoriteSongs = songsMarkedAsFavorite();

  return (
    <View style={globalStyles.root}>
      <View style={globalStyles.header}>
        <Text style={[globalStyles.uiTextPrimary, { fontSize: font.size.h3 }]}>OSMPlayer</Text>
      </View>

      <ScrollView>
        <Text style={[globalStyles.uiTextPrimary, styles.welcomeBack]}>Welcome back!</Text>
        <Text style={[globalStyles.uiTextSecondary, styles.continueListening]}>
          Continue listening
        </Text>
        <View style={[styles.lastSongView]}></View>

        <Text style={[globalStyles.uiTextPrimary, styles.welcomeBack]}>Favorites</Text>
        <Text style={[globalStyles.uiTextSecondary, styles.continueListening]}>
          Songs you marked as favorite
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeBack: {
    alignSelf: 'flex-start',
    marginLeft: margin.s3,
    fontSize: font.size.h2,
    fontFamily: font.type.regular,
    marginTop: margin.s4,
  },
  continueListening: {
    alignSelf: 'flex-start',
    marginLeft: margin.s3,
    fontSize: font.size.h4,
    fontFamily: font.type.regular,
  },
  lastSongView: {
    width: '95%',
    height: 175,
    alignSelf: 'center',
    backgroundColor: Colors.black.lightest,
    borderRadius: border.s1,
    marginTop: margin.s2,
    marginBottom: margin.s6,
  },
});
