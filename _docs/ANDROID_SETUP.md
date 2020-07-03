# Grüvee Android Development Setup

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

> Note: On **Windows 10** if it still sometimes says that it cannot find `google-services.json` file, restart the emulator and re-run `npm start` and `npm run android-start` commands.

> **Please note that you need to start the emulator from Android Studio first before you run any commands.**
>
> For this just open up Android Studio and build the project, with an emulator set.
>
> To note: we have been developing on a Pixel 2 emulator and a Pixel 3 physical device, but feel free to use any device you'd like! At the end of the day it will be better for testing anyways.

## Start Android Emulator

1. After opening project in Android Studio for the first time you should see an event in `Event Log`. Open the `Event Log` and click `Configure` to automatically configure android project with `AndroidManifest.xml` files
2. You can follow this guide https://developer.android.com/studio/run/managing-avds to setup new virtual device

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

> **Note**: Upon running `android-start` command on **Windows 10**, if you run into error:
>
> ```bash
> '.' is not recognized as an internal or external command
> ```
>
> you may need to change `android-start` script by removing `./` in front of `gradlew` in both places:
>
> ```bash
> "android-start": "cd ./android && gradlew app:assembleDebug && gradlew installDebug && npm run android --clearCache"
> ```

Congratulations! You should now see a beautiful Grüvee mobile app on Android displayed and ready to go! If you find a better way to get started developing for iOS or run into any snags, make sure to go checkout [how to contribute](../CONTRIBUTING.md) to help out the project!
