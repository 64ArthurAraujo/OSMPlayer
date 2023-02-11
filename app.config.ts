import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'osmplayer',
  name: 'OSMPlayer',
  android: {
    softwareKeyboardLayoutMode: 'pan',
    package: 'com.a64o.osmplayer',
  },
});
