import * as FileSystem from 'expo-file-system';

export const ignoreList = [
  'file:///storage/emulated/0/WhatsApp/',
  'file:///storage/emulated/0/Telegram/',
  'file:///storage/emulated/0/Android/',
  'file:///storage/emulated/0/Pictures/',
  'file:///storage/emulated/0/games/',
  FileSystem.documentDirectory,
];

export async function isDirectory(path) {
  let isDir = undefined;

  await FileSystem.readDirectoryAsync(path)
    .then(() => {
      isDir = true;
    })
    .catch(() => {
      isDir = false;
    });

  return isDir;
}

export function isEmptyOrUndefined(entity: any[]) {
  if (entity == undefined) return true;
  if (entity.length <= 0) return true;

  return false;
}

export function whoIsNotADotFile(file) {
  return !file.startsWith('.');
}

export function whoIsAMP3(file) {
  return file.endsWith('.mp3');
}

let startTime, endTime;

export function startTimer() {
  startTime = performance.now();
}

export function endTimer() {
  endTime = performance.now();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  console.info(`Scan completed in ${seconds} seconds`);
}
