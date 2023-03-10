import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'osmplayer',
  name: 'OSMPlayer',
  android: {
    softwareKeyboardLayoutMode: 'pan',
    package: 'com.a64o.osmplayer',
    permissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
    ],
  },
});
