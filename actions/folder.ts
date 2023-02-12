import * as FileSystem from 'expo-file-system';
import { PermissionsAndroid } from 'react-native';
import {
  endTimer,
  ignoreList,
  isDirectory,
  isEmptyOrUndefined,
  startTimer,
  whoIsAMP3,
  whoIsNotADotFile,
} from './util/folder-util';

const songsOnDevice: string[] = [];

export async function readAllSongs() {
  await PermissionsAndroid.request('android.permission.READ_EXTERNAL_STORAGE');

  startTimer();
  await getSongsOf('file:///storage/emulated/0/');
  endTimer();

  console.info(`Found ${songsOnDevice.length} songs.`);
  console.log(songsOnDevice);

  return songsOnDevice;
}

async function getSongsOf(folderPath: string) {
  if (ignoreList.includes(folderPath)) return [];

  console.log(`Listing songs from ${folderPath}`);

  const folder = (await FileSystem.readDirectoryAsync(folderPath)).filter(whoIsNotADotFile) ?? [];

  if (isEmptyOrUndefined(folder)) return [];

  const songs = folder.filter(whoIsAMP3).map((song) => folderPath + song);

  const subFolders = [];

  for (const subFolder of folder) {
    if (await isDirectory(folderPath + subFolder + '/')) {
      subFolders.push(folderPath + subFolder + '/');
    }
  }

  for (const folder of subFolders) {
    for (const song of await getSongsOf(folder)) {
      songsOnDevice.push(song);
      songs.push(song);
    }
  }

  return songs.filter((array) => array.length > 0);
}
