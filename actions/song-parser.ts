import { PermissionsAndroid } from 'react-native';
import { Song } from '../types/song';
import { endTimer, isEmptyOrUndefined, startTimer } from './util/folder-util';
import { readAllSongs } from './folder';
import uuid from 'react-native-uuid';
import {
  copyAsync,
  deleteAsync,
  documentDirectory,
  readAsStringAsync,
  readDirectoryAsync,
  writeAsStringAsync,
} from 'expo-file-system';
import {
  createFolder,
  createSongsFolder,
  informAndCleanParsingError,
} from './util/song-parser-util';
import { Log } from '../util/logger';

const songsFolderPath = documentDirectory + 'songs/';

export async function parsedSongs() {
  await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE');
  await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');

  await deleteAsync(songsFolderPath);

  await createSongsFolder();

  let songsFolder = await readDirectoryAsync(songsFolderPath);

  let mp3Songs = await readAllSongs();

  if (isEmptyOrUndefined(songsFolder) || mp3Songs.length > songsFolder.length) {
    Log('Starting song parsing...');

    startTimer();

    for (const songPath of mp3Songs) {
      Log(`Parsing ${songPath}`);
      await createMusicFolderFor(songPath);
    }

    endTimer('Song parsing');
  }

  Log('Reading all parsed songs...');

  songsFolder = await readDirectoryAsync(songsFolderPath); // update again songs folder
  const songsParsed = [];

  startTimer();

  for (const song of songsFolder) {
    Log(`Reading /songs/${song}/`);

    let musicInfoString = await readAsStringAsync(`${songsFolderPath}${song}/info.json`);
    songsParsed.push(JSON.parse(musicInfoString) as Song);
  }

  endTimer('Song information reading');

  return songsParsed as Song[];
}

async function createMusicFolderFor(songPath: string) {
  let songUUID = uuid.v4();

  try {
    await createFolder(`${songUUID}/`);
    await copyAsync({ from: songPath, to: `${songsFolderPath}${songUUID}/${songUUID}.mp3` });
    await writeAsStringAsync(
      `${songsFolderPath}${songUUID}/info.json`,
      JSON.stringify({
        uuid: songUUID,
        title: songName(songPath),
        mp3Path: `${songsFolderPath}${songUUID}/musike.mp3`,
      } as Song)
    );
  } catch (Exception) {
    await informAndCleanParsingError(songPath, songUUID);
  }
}

function songName(path: string) {
  let splitByDirectory = path.split('/');
  let mp3Name = splitByDirectory[splitByDirectory.length - 1];

  return mp3Name.replace('.mp3', '');
}
