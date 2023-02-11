import * as NavigationBar from 'expo-navigation-bar';

export async function systemNavBarColor(color: string) {
  await NavigationBar.setBackgroundColorAsync(color);
}
