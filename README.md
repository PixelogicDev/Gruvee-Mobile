<h1 align="center">Grüvee-Mobile</h1>
<h3 align="center">
  <strong>Let's get Grüvee with a new social, collaborative playlist for iPhone and Android</strong>
</h3>

<p align="center">
    <a href="https://discordapp.com/invite/ubgX6T8">
        <img src="https://img.shields.io/discord/391635862959554561?label=Discord" alt="Discord members online" />
    </a>
    <a href="https://github.com/pixelogicdev/gruvee">
        <img alt="GitHub issues" src="https://img.shields.io/github/issues/pixelogicdev/gruvee-mobile">
    </a>
    <a href="CONTRIBUTING.md#-how-to-contribute">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
    </a>
</p>

<!-- <h3 align="center">
 <a href="#getting-started">Getting Started</a>
  <span> · </span>
  <a href="#running-grüvee-locally">Running Grüvee Locally</a>
  <span> · </span>
  <a href="README-Support/CONTRIBUTING.md#how-to-contribute">How to Contribute</a>
  <span> · </span>
  <a href="README-Support/CONTRIBUTING.md#current-contributors">Current Contributors</a>

</h3> -->

## 🎸 What is Grüvee?

Grüvee is an open source, social, collabortive playlist made by the [PixelogicDev Twitch Community](https://twitch.tv/pixelogicdev). This project was entirely made live, on Twitch while receiving help from chat and others contributing via Pull Requests!

## 🤔 Why use it?

Grüvee is being created to make sharing music an easier and more personal experience with others. While at the same time, getting around the plethora of music streaming platforms out there. Grüvee does this by addressing the following concerns:

-   `Different Music Services`: Grüvee will give you the opportunity to collaborate on playlists with people that don't share the same music streaming service as you! Behind the scenes, Grüvee will make sure you are all in sync with your favorite platform.
-   `Discussions`: Talk about what gets your HYPED about certain songs and save that thread with your friends! Grüvee will keep track of your comments on a per song basis.
-   `Notifications`: Get notified when people in your Grüvee Playlist do something! It's funny how major providers don't even notify you when people add new songs to your collaborative playlists. Grüvee is here to change that.
-   `Show Off Your Music Taste`: Music is an expression of ourselves. Grüvee is focused around how to you express your love and passion for music in a way that is fun and inspiring.

## 😲 Still not sold?

Words are hard. Enjoy some videos of ourt current progress!

### `Branch: release-1.0` (Progress as of 06.09.2020)

#ComingSoon

#### iOS

#### Android

If you are interested in becoming a member of the team check out the **[PixelogicDev Twitch](https://twitch.tv/pixelogicdev)**, the **[PixelogicDev Discord](https://discord.gg/8NFtvp5)** and **[contribute](README-Support/CONTRIBUTING.md)** to this awesome project!

# Release Checklist

This living list of items is something that will constantly be updated as we develop through Grüvee.

-   [x] Release Alpha to community members (iOS/Android)

    -   Login with Spotify
    -   Add Playlist/Songs/Comments/Members
    -   Delete Playlist/Songs/Comments/Members

-   [ ] Release Beta to community members (iOS/Android)

    -   Alpha Work
    -   Login with Apple Music
    -   Login with Youtube Music
    -   Push notification support
    -   Rename playlists
    -   Delete members from playlists
    -   Add members after playlist is made
    -   Realtime loading
    -   Cross streaming platform support

-   [ ] Release Grüvee v1.0 to all (iOS/Android)
    -   Alpha + Beta Work
    -   Show when a member of a list has listened to your song
    -   Add Profile Support

# Getting Started

## Tech Stack

| Stack        | Tech                                                                                       |                                                                |
| ------------ | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| IDE          | [Visual Studio Code](https://code.visualstudio.com/)                                       | You can use your preferred IDE but this is the one we like 🙃  |
| Frontend     | [React Native 0.60](<[LinkToReactNative0.60](https://www.npmjs.com/package/react-native)>) | Utilising Javascript to develop this cross platform mobile app |
| Backend      | [Firebase (Repo)](https://github.com/PixelogicDev/Gruvee-Backend)                          | Serverless Functions in Firebase using GoLang                  |
| Design :art: | [Sketch](https://www.sketch.com/)                                                          | The design files can be found [here](/Design)                  |

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

## Things Left To Document

-   Add setup for integrating gruveebackend repo
-   Add setup for running Android emulator
-   Android startup `emulator -avd Pixel_2_API_29`
-   Add APK build process
-   Add Assembly process for APK `./gradlew app:assembleRelease`

# Running Grüvee Locally

Now we are at the GOOD stuff. Time to get Grüvee running locally. Make sure you have the [prerequisites](#prerequisites) installed. Open up **two instances** of your favorite terminal/command prompt and navigate to the root directory of the Grüvee repository for both of them. One is going to run your React Native bundle server and the other will start the Grüvee iOS or Android app.

## 🌲 Environment Variables

We have included an [`.example.env`](/.example.env) that has the properties that are needed for the app to run properly. Start here by making a `.env` in the root of the repo

### `ENVIRONMENT`

```
This property does not need to be changed
```

### `SPOTIFY_CLIENTID & SPOTIFY_CLIENTSECRET`

```
If you would like to have Spotify support you will need to setup a Spotify developers app. To do this follow these steps:

1. Head to https://developer.spotify.com
2. Log in with your Spotify account
3. Select 'Create An App'
4. Fill out the information. You can honestly put anything here
5. On the next prompt select 'non-commercial'
6. Agree to the terms and conditions
7. Grab the Client ID and the Client Secret
```

### `SPOTIFY_REDIRECTURI`

```
For Spotify auth you will need to add a redirect URI. This is currently set to what we currently use in Grüvee. In your newly created Spotify Dev App, head to the 'Edit Settings' section and add `gruvee://spotify_auth` to the Redirect URIs section.
```

### `FIREBASE_DEV_URI`

```
In order to get the app running you will need to create a Firebase project and set the Dev URI here. Use the following steps:

1. Head to https://console.firebase.google.com
2. Select '+ Add Project'
3. Continue through the prompts and then select Create Project
4. Head to 'Authentication' section and then the 'Sign-in method' section
5. Scroll down to Authorized domains
6. You will see a list of domains. Grab the one that that looks like this: {YourProject-Id}.firebaseapp.com
```

### `ALGOLIA_APP_ID && ALGOLIA_APP_KEY && ALGOLIA_DEV_INDEX_NAME`

```
This is used for searching for users to add to a playlist. If you find yourself needing this UI/UX please head to the Contributing(README-Support/CONTRIBUTING.md) documentation to file an issue or join the PixelogicDev Discord(https://discord.gg/8NFtvp5) to reach out directly to people actively working on this project.
```

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

See the [Grüvee iOS Development documentation](README-Support/IOS-SETUP.md) for all information regarding getting setup for Grüvee on iOS!

## 🤖 Grüvee Android Development

See the [Grüvee Android Development documentation](README-Support/ANDROID-SETUP.md) for all information regarding getting setup for Grüvee on Android!

# 🤘 Contributing changes

See [CONTRIBUTING.md](CONTRIBUTING.md)
