# Grüvee Android Development Setup

## Notes

> **You need to start the emulator from Android Studio first before you run any commands.**

> We have been developing on a Pixel 2 emulator and a Pixel 3 physical device, but feel free to use any device you'd like! At the end of the day it will be better for testing anyways.

## Prerequisites

### 🔥 Firebase

#### Create and add `google-services.json` file to you project

In Firebase console you need to create new application, get and add `google-services.json` file to the project:

1. Head to https://console.firebase.google.com
2. Go to `Project settings` under `settings icon` next to `Project Overview`
3. Select `Android` under `General` tab, `Your apps` section
4. On first step, fill in the fields for example:
    - `Android package name`: com.gruvee
    - `App nickname (optional)`: Gruvee
5. On second step, click `Download google-services.json` button and then click `Next` button
6. You can skip third and fourth step
7. Add downloaded `google-services.json` to your `$GRUVEE_PROJECT/android/app` directory where `$GRUVEE_PROJECT` is the location of your root project.

#### Notes

> On **Windows 10** if it still sometimes says that it cannot find `google-services.json` file, restart the android emulator and re-run `npm start` and `npm run android-start` commands.

## Starting Android Emulator

There is a nice post that guides you through [How to Set Up an Android Emulator using Command Line](https://medium.com/@vsburnett/how-to-set-up-an-android-emulator-in-windows-10-e0a3284b5f94) which might be helpful

1. First you need to setup new android virtual device (AVD). You can follow [this guide](https://developer.android.com/studio/run/managing-avds#createavd).
    - On **Windows 10** if there is no option to open AVD Manager, there should be an event in `Event Log` (right-left corner). Open the `Event Log` and click `Configure` to automatically configure android project with `AndroidManifest.xml` files
2. After setting up new AVD you can run it in few ways:
    - Inside Android Studio - `Tools > AVD Manager > Actions > Launch this AVD in the emulator`
    - [From command line](https://developer.android.com/studio/run/emulator-commandline)

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

### Notes

> On **Windows 10** upon running `android-start` command , if you run into error:
>
> ```bash
> '.' is not recognized as an internal or external command
> ```
>
> you need to change `android-start` script by removing `./` in front of `gradlew` in both places:
>
> ```bash
> "android-start": "cd ./android && gradlew app:assembleDebug && gradlew installDebug && npm run android --clearCache"
> ```

Congratulations! You should now see a beautiful Grüvee mobile app on Android displayed and ready to go! If you find a better way to get started developing for iOS or run into any snags, make sure to go checkout [how to contribute](/.github/CONTRIBUTING.md) to help out the project!
