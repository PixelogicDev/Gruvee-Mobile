# Grüvee
## Get Grüvee with a new social, collabortive playlist for iPhone and Android

## General
Grüvee is an open source social, collabortive playlist made by the [PixelogicDev Twitch Community](https://twitch.tv/pixelogicdev). This project was entirely made live, on Twitch while receiving help from chat and contributing to Pull Requests here! If you are interested in becoming a member of the team and contributing check out the [PixelogicDev Twitch Community](https://twitch.tv/pixelogicdev) and read below about how to contribute to this awesome project!


## Getting Started
### Tech Stack

#### Frontend
We are using [React Native 0.60](LinkToReactNative0.60) for this project to develop this cross platform mobile app. 

#### Backend (WIP)
The backend services are a work in progress, but are leaning towards a serverless approach using Azure Functions for most logic.

#### Design
We are utilizing Sketch as a way to design all the views for this app and can be found [here](/Design).

**ALL of these sections will be open for contributions and are highly encouraged!**

### Prerequisites
In order to develop for Grüvee you are going to need to have a few things installed on your machine:<br>

#### General
[Lastest Version of Node.js](LinkToNodeJs)<br>

#### iOS Development
[Latest Version of Xcode](LinkToXcode)<br>
[Latest Version of CocoaPods](LinkToCocoaPods)

#### Android Development
[JDK 11 or Lower](LinkToJDK) (This is very important)<br>
[Latest Version of Android Studio](LinkToAndroidStudio)<br>
[Android Emulator](LinkToHowToAndroidEmulator)
- One thing to note about this, we have been developing on a Pixel 2 emulator, but feel free to use any device you'd like! At the end of the day it will be better fot testing anyways

## Running Grüvee Locally
Now we are at the GOOD stuff. Time to get Grüvee running locally. Open up **two instances** of your favorite terminal/command prompt and navigate to the root directory of the Grüvee repository for both of them. One is going to run your bundle server and the other will start the Grüvee iOS or Android app.

### NPM Commands
All the NPM commands and dependencies for this project can be located in the [package.json file](/package.json), but we only need two to get started.

#### iOS
If you are running Grüvee for iOS use the following commands. **Please note that the npm command utilizes an iPhone 11 Simulator**. If you do not have this installed, you will need install it or go into the [package.json file](/package.json) and replace the `npm run ios-start` command with the following:<br>
`"react-native run-ios --simulator=\"{WhateverIphoneModelYouAreUsing}\"",` 

Once thats complete run the following commands:<br>

**Terminal/Command Prompt Instance 1**<br>
Start the bundle server: `npm run start`

**Terminal/Command Prompt Instance 2**<br>
Run the iOS project: `npm run ios-start`


#### Android
If you are running Grüvee for Android use the following commands. **Please note you need to start the emulator from Android Studio first before you run any commands.** For this just open up Android Studio and build the project, with an emulator set.

Once thats complete run the following commands:<br>

**Terminal/Command Prompt Instance 1**<br>
Start the bundle server: `npm run start`

**Terminal/Command Prompt Instance 2**<br>
Run the Android project: `npm run android-start`

Congratulations! You should now see a beautiful Grüvee mobile app displayed and ready to go!

## Contributing

#### Pull Requests
Now that you are up and running, it's time to push your incredible changes to the Grüvee Repo! For this we will utilize [Pull Requests](LinkToWhatPullRequestsAre). Make sure all your changes are committed to your forked version of Grüvee and go to [the Grüvee repository](LinkToGruvee) and create a Pull Request to merge your changes into the current release branch (ie: `releaase-1.0`). Leave a brief description of your changes, any images/videos of what your new code is doing (if applicable), and any associated GitHub issues. Get ready for some feedback and thank you for contributing!

#### Issues
The only way this project will keep growing and getting better is by all of us chipping in to log bugs and suggesting new features! Please utilize [GitHub Issues](GruveeGitHubIssueslink) to add any bugs or suggestions!

**One last thing to note here: if you are a first time contributor and you are not currently on the [Current Contributors List](#current-contributors), please make sure to include a change with adding yourself! The format is as follows:
`[DesiredName](linkToYourSocial) - Where did you come from?`**

## Current Contributors
[rawrsatbeards](SocialLinkForRawrs) - PixelogicDev Channel Moderator<br>
[poopuhchoo](https://github.com/tjengland) - PixelogicDev Team Member


