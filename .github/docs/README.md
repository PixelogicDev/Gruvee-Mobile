# Getting Started

## Tech Stack

| Stack        | Tech                                                                                       |                                                                |
| ------------ | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| IDE          | [Visual Studio Code](https://code.visualstudio.com/)                                       | You can use your preferred IDE but this is the one we like 🙃  |
| Frontend     | [React Native 0.60](<[LinkToReactNative0.60](https://www.npmjs.com/package/react-native)>) | Utilising Javascript to develop this cross platform mobile app |
| Backend      | [Firebase (Repo)](https://github.com/PixelogicDev/gruveebackend)                           | Serverless Functions in Firebase using GoLang                  |
| Design :art: | [Sketch](https://www.sketch.com/)                                                          | The design files can be found [here](/Design)                  |

> ALL of these sections are open for contributions and are highly encouraged!

## Prerequisites

In order to develop for Grüvee you are going to need to switch to `release-1.0` branch:

```bash
$ git checkout release-1.0
```

and have a few things installed on your machine:

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

# Running Grüvee Locally

Now we are at the GOOD stuff. Time to get Grüvee running locally. Make sure you have the [prerequisites](#prerequisites) installed. Open up **two instances** of your favorite terminal/command prompt and navigate to the root directory of the Grüvee repository for both of them. One is going to run your React Native bundle server and the other will start the Grüvee iOS or Android app.

## 🌲 Environment Variables

We have included an [`.example.env`](/.example.env) that has the properties that are needed for the app to run properly. Start here by copying it and renaming it to `.env` in the root of the repo

### `ENVIRONMENT`

This property does not need to be changed

### `SPOTIFY_CLIENTID & SPOTIFY_CLIENTSECRET`

If you would like to have Spotify support you will need to setup a Spotify developers app. To do this follow these steps:

1. Head to https://developer.spotify.com
2. Log in with your Spotify account
3. Select `Create An App`
4. Fill out the information. You can honestly put anything here
5. On the next prompt select `non-commercial`
6. Agree to the terms and conditions
7. Grab the `Client ID` and the `Client Secret`

### `SPOTIFY_REDIRECTURI`

For Spotify auth you will need to add a redirect URI. This is currently set to what we currently use in Grüvee. In your newly created Spotify Dev App, head to the `Edit Settings` section and add `gruvee://spotify_auth` to the Redirect URIs section.

### `FIREBASE_DEV_URI`

In order to get the app running you will need to create a Firebase project and set the Dev URI here. Use the following steps:

1. Head to https://console.firebase.google.com
2. Select `+ Add Project`
3. Continue through the prompts and then select `Create Project`
4. Head to `Authentication` section and then the `Sign-in method` section
5. Scroll down to Authorized domains
6. You will see a list of domains. Grab the one that that looks like this: `{YourProject-Id}.firebaseapp.com`

### `ALGOLIA_APP_ID && ALGOLIA_APP_KEY && ALGOLIA_DEV_INDEX_NAME`

This is used for searching for users to add to a playlist. If you find yourself needing this UI/UX please head to the [Contributing documentation](../CONTRIBUTING.md) for help filing an issue or join the [PixelogicDev Discord](https://discord.gg/8NFtvp5) to reach out directly to people actively working on this project.

### Notes

> -   Import `.env` using `@env` module name ([example](/app/config/creds.js))
> -   If updating your `.env` variables doesn't seem to change anything try to clear the cache by either:
>     -   `npm start -- --reset-cache`
>     -   `rm -rf node_modules/.cache/babel-loader/*` ([babel-plugin-dotenv-import documentation](https://github.com/tusbar/babel-plugin-dotenv-import#caveats))

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

See the [Grüvee iOS Development documentation](IOS_SETUP.md) for all information regarding getting setup for Grüvee on iOS!

## 🤖 Grüvee Android Development

See the [Grüvee Android Development documentation](ANDROID_SETUP.md) for all information regarding getting setup for Grüvee on Android!
