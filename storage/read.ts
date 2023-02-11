import AsyncStorage from '@react-native-async-storage/async-storage';

export async function read(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value as any;
    }
  } catch (e) {
    console.error(e);
  }
}
