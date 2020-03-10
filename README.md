<h1 align="center">Grüvee-Mobile</h1>
<p align="center">
  <strong>Let's get Grüvee with a new social, collaborative playlist for iPhone and Android</strong>
</p>

<p align="center">
    <a href="https://discordapp.com/invite/ubgX6T8">
        <img src="https://img.shields.io/discord/391635862959554561?label=Discord" alt="Discord members online" />
    </a>
    <a href="https://github.com/pixelogicdev/gruvee">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/pixelogicdev/gruvee-mobile">
    </a>
    <a href="#-how-to-contribute">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
    </a>
</p>

<h3 align="center">
 <a href="#getting-started">Getting Started</a>
  <span> · </span>
  <a href="#running-grüvee-locally">Running Grüvee Locally</a>
  <span> · </span>
  <a href="#-how-to-contribute">How to Contribute</a>
  <span> · </span>
  <a href="#current-contributors">Current Contributors</a>
  
</h3>

Grüvee is an open source social, collabortive playlist made by the [PixelogicDev Twitch Community](https://twitch.tv/pixelogicdev). This project was entirely made live, on Twitch while receiving help from chat and contributing to Pull Requests here!

If you are interested in becoming a member of the team check out the **[PixelogicDev Twitch](https://twitch.tv/pixelogicdev)**, the **[PixelogicDev Discord](https://discord.gg/ubgX6T8)** and **[contribute](#-how-to-contribute)** to this awesome project!

---

# Getting Started

## Tech Stack

| Stack        | Tech                                                                                     |                                                                |
| ------------ | :--------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| IDE          | [Visual Studio Code](https://code.visualstudio.com/)                                     | You can use your preferred IDE but this is the one we like 🙃  |
| Frontend     | [React Native 0.60]([LinkToReactNative0.60](https://www.npmjs.com/package/react-native)) | Utilising Javascript to develop this cross platform mobile app |
| Backend      | [Firebase (Repo)](https://github.com/PixelogicDev/Gruvee-Backend)                        | Serverless Functions in Firebase using GoLang                  |
| Design :art: | [Sketch](https://www.sketch.com/)                                                        | The design files can be found [here](/Design)                  |

> ALL of these sections are open for contributions and are highly encouraged!

## Prerequisites

In order to develop for Grüvee you are going to need to have a few things installed on your machine:

1. **Javascript**

    - [Node.js 12.9.1](https://nodejs.org/dist/v12.9.1/)

2. **iOS Development**

    - [Latest Version of Xcode](https://developer.apple.com/xcode/)
    - [Latest Version of CocoaPods](https://cocoapods.org/)

3. **Android Development**

    - [JDK 11 or Lower](https://www.oracle.com/technetwork/java/javase/downloads/index.html) (This is very important)
    - [Latest Version of Android Studio](https://developer.android.com/studio)
    - [Android Emulator](https://developer.android.com/studio/run/emulator)
    - Android Build Tools 28.0.3 (Installable from Studio SDK Manager)
    - Android 9 SDK (Installable from Studio SDK Manager)

# TODO - Add setup for 3rd party services in .env file
# TODO - Add setup for integrating gruveebackend repo

# Running Grüvee Locally

Now we are at the GOOD stuff. Time to get Grüvee running locally. Make sure you have the [prerequisites](#prerequisites) installed. Open up **two instances** of your favorite terminal/command prompt and navigate to the root directory of the Grüvee repository for both of them. One is going to run your React Native bundle server and the other will start the Grüvee iOS or Android app.

## NPM Commands

All the NPM commands and dependencies for this project can be located in the [package.json file](/package.json), but we only need two to get started.

1. This npm command will download all the React Native package

    (this is only needed when cloned for the first time or if new npm packages are introduced to the [package.json file](/package.json))

    ```command
    $ npm install
    ```

2. This npm command will start the React Native bundle server
    ```command
    $ npm start
    ```

## 📱 Grüvee iOS Development

If you are running Grüvee for iOS use the following commands.

> **Please note that the npm command utilizes an iPhone 11 Simulator**.
>
> If you do not have this installed, you will need install it or go into the [package.json file](/package.json) and replace the `ios-start` script with the following:
>
> ```js
> "ios-start": "react-native run-ios --simulator=\"{WhateveriPhoneModelYouAreUsing}\",
> ```

Once thats complete run the following commands:

1. Install cocoapods:

    ```console
    $ cd ios/ && pod install
    ```

2. Run iOS emulator

    Ensure you're in the project's root directory

    ```console
    $ npm run ios-start
    ```

## 🤖 Grüvee Android Development

> **Please note that you need to start the emulator from Android Studio first before you run any commands.**
>
> For this just open up Android Studio and build the project, with an emulator set.
>
> To note: we have been developing on a Pixel 2 emulator and a Pixel 3 physical device, but feel free to use any device you'd like! At the end of the day it will be better for testing anyways.

### Setup keystore for android signing
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

### Run the dev server
Run `npm run start` FIRST on one terminal and then `npm run android-start` on another one.

```bash
$ npm run start # On a different terminal
$ npm run android-start
```

Congratulations! You should now see a beautiful Grüvee mobile app displayed and ready to go!

# 🎉 How to Contribute

## 🔀 Pull Requests

Now that you are up and running, it's time to push your incredible changes to the Grüvee Repo! For this we will utilize [Pull Requests](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Make sure all your changes are committed to your forked version of Grüvee and go to [the Grüvee repository](https://github.com/PixelogicDev/Gruvee) and create a Pull Request to merge your changes into the current release branch (ie: `release-1.0`).

Leave a brief description of your changes, any images/videos of what your new code is doing (if applicable), and any associated GitHub issues. Get ready for some feedback and thank you for contributing!

## 🐛 Issues

The only way this project will keep growing and getting better is by all of us chipping in to log bugs and suggesting new features! Please utilize [GitHub Issues](https://github.com/PixelogicDev/Gruvee/issues) to report any bugs or add suggestions!

Don't be scared to join the [PixelogicDev discord](https://discord.gg/ubgX6T8) if you need help.

> One last thing to note here: if you are a first time contributor and you are not currently on the [Current Contributors List](#current-contributors), please make sure to include a change with adding yourself! The format is as follows:
>
> ```
> [DesiredName](linkToYourSocial) - Where did you come from?
> ```

## ⭐Current Contributors

+ [@isabellabrookes](https://github.com/isabellabrookes) aka rawrsatbeards - PixelogicDev Channel Moderator
+ [poopuhchoo](https://github.com/tjengland) - PixelogicDev Team Member
+ [Bastian](https://github.com/BastianInuk) - PixelogicDev Team Member
+ [DynamicDonkey](https://github.com/DynamicDonkey) - PixelogicDev Channel Member
+ [miugel](https://github.com/miugel) - PixelogicDev Channel Member
+ [creativenobu](https://github.com/creativenobu) - PixelogicDev Channel Member
