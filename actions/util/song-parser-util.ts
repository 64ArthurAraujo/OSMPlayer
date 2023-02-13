import { deleteAsync, documentDirectory, makeDirectoryAsync } from 'expo-file-system';

const songsFolderPath = documentDirectory + 'songs/';

export async function informAndCleanParsingError(song, songUUID) {
  console.warn(`Could not parse ${song}`);
  console.info('Cleaning unsucessful parse...');
  await deleteAsync(`${songsFolderPath}${songUUID}/`);
}

export async function createFolder(path) {
  await makeDirectoryAsync(songsFolderPath + path);
}

export async function createSongsFolder() {
  try {
    await makeDirectoryAsync(songsFolderPath);
  } catch (Exception) {
    console.info('Songs folder already exists! Ignoring... ');
  }
}
