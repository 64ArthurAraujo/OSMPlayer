import * as FileSystem from 'expo-file-system';
import { Info } from '../../util/logger';

export const ignoreList = [
  'file:///storage/emulated/0/WhatsApp/',
  'file:///storage/emulated/0/Telegram/',
  'file:///storage/emulated/0/Android/',
  'file:///storage/emulated/0/Pictures/',
  'file:///storage/emulated/0/Alarms/',
  'file:///storage/emulated/0/Notifications/',
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

export function endTimer(endevour: string) {
  endTime = performance.now();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  Info(`${endevour} completed in ${seconds} seconds!`);
}
