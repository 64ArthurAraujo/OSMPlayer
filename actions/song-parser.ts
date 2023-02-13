import { PermissionsAndroid } from 'react-native';
import { Song } from '../types/song';
import { isEmptyOrUndefined } from './util/folder-util';
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

const songsFolderPath = documentDirectory + 'songs/';

export async function parsedSongs() {
  await PermissionsAndroid.request('android.permission.WRITE_EXTERNAL_STORAGE');
  await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');

  await deleteAsync(songsFolderPath);

  await createSongsFolder();

  let songsFolder = await readDirectoryAsync(songsFolderPath);

  if (isEmptyOrUndefined(songsFolder)) {
    console.log('Starting song parsing...');

    let mp3Songs = await readAllSongs();

    for (const songPath of mp3Songs) {
      console.log(`Parsing ${songPath}`);
      await createMusicFolderFor(songPath);
    }

    console.log('Finished song parsing...');
  }

  // console.log('Reading all parsed songs...');

  return [] as Song[];
}

async function createMusicFolderFor(songPath: string) {
  let songUUID = uuid.v4();

  try {
    await createFolder(`${songUUID}/`);
    await copyAsync({ from: songPath, to: `${songsFolderPath}${songUUID}/${songUUID}.mp3` });
    await writeAsStringAsync(
      `${songsFolderPath}${songUUID}/info.json`,
      JSON.stringify({
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
