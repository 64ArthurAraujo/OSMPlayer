import AsyncStorage from '@react-native-async-storage/async-storage';

export async function write(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
}
