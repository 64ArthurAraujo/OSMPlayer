import { deleteAsync, documentDirectory, makeDirectoryAsync } from 'expo-file-system';
import { Info } from '../../util/logger';

const songsFolderPath = documentDirectory + 'songs/';

export async function informAndCleanParsingError(song, songUUID) {
  Info(`Could not parse ${song}`);
  Info('Cleaning unsucessful parse...');
  await deleteAsync(`${songsFolderPath}${songUUID}/`);
}

export async function createFolder(path) {
  await makeDirectoryAsync(songsFolderPath + path);
}

export async function createSongsFolder() {
  try {
    await makeDirectoryAsync(songsFolderPath);
  } catch (Exception) {
    Info('Songs folder already exists! Ignoring... ');
  }
}
