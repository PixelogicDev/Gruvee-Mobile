# Grüvee Android Development Setup

> **Please note that you need to start the emulator from Android Studio first before you run any commands.**
>
> For this just open up Android Studio and build the project, with an emulator set.
>
> To note: we have been developing on a Pixel 2 emulator and a Pixel 3 physical device, but feel free to use any device you'd like! At the end of the day it will be better for testing anyways.

## Grüvee Backend Setup

Before getting started, make sure you [Grüvee Backend](https://github.com/PixelogicDev/Gruvee-Backend) setup! This backend is a serverless approach that utilizes Firebase Functions to run any off client logic. All these functions will help you run certain pieces of logic if needed.

## Setup keystore for android signing

Where `$GRUVEE_PROJECT` is the location of your root project.

```bash
$ cd $GRUVEE_PROJECT/android/app
$ keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -keyalg RSA -keysize 2048 -validity 10000
```

Add the keystore password (min 6 characters). Fill the information it requires (name, organization, country, etc), finally add the debug key password (you may use the same password as for the keystore, for development purposes).

Next we open the gradle build config (located at `android/app/build.gradle`) and under `signingConfigs` update the `storePassword` and `keyPassword`. (**Note**: if you changed the store filename (`-keystore`) and alias (`-alias`) you will have to update that in the `build.gradle` file).

```gradle
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword '<your-keystore-password-here>'
        keyAlias 'androiddebugkey'
        keyPassword '<your-keystore-password-here>'
    }
}
```

## Run the dev server

Run `npm run start` FIRST on one terminal and then `npm run android-start` on another one.

```bash
$ npm run start # On a different terminal
$ npm run android-start
```

Congratulations! You should now see a beautiful Grüvee mobile app on Android displayed and ready to go! If you find a better way to get started developing for iOS or run into any snags, make sure to go checkout [how to contribute](../CONTRIBUTING.md) to help out the project!
