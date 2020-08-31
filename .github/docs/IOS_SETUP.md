# Grüvee iOS Development Setup

> **Please note that you need to have the latest version of xcode running before you start.**

## Grüvee Backend Setup

Before getting started, make sure you [Grüvee Backend](https://github.com/PixelogicDev/gruveebackend) setup! This backend is a serverless approach that utilizes Firebase Functions to run any off client logic. All these functions will help you run certain pieces of logic if needed.

If you are running Grüvee for iOS use the following commands.

> **Please note that the npm command utilizes an iPhone 11 Simulator**.
>
> If you do not have this installed, you will need install it or go into the [package.json file](../../package.json) and replace the `ios-start` script with the following:
>
> ```json
> "ios-start": "react-native run-ios --simulator=\"{WhateveriPhoneModelYouAreUsing}\",
> ```

Once thats complete run the following commands:

1.  Install cocoapods:

    ```console
    $ cd ios/ && pod install
    ```

2.  Run iOS emulator

        Ensure you're in the project's root directory

        ```console
        $ npm run ios-start
        ```

Congratulations! You should now see a beautiful Grüvee mobile app on iOS displayed and ready to go! If you find a better way to get started developing for iOS or run into any snags, make sure to go checkout [how to contribute](../CONTRIBUTING.md) to help out the project!
