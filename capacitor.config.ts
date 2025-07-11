import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cendr.app',
  appName: 'Cendr App',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
