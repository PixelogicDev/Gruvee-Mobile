package com.gruvee;

import java.util.Arrays;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;

// Firebase
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;

import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    protected ReactGateway createReactGateway() {
        ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };

        return new ReactGateway(this, isDebug(), host);
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        // Add additional packages you require here
        // No need to add RnnPackage and MainReactPackage
        return Arrays.<ReactPackage>asList(
                new ReactNativeFirebaseAppPackage(),
                new ReactNativeFirebaseFirestorePackage(),
                new ReactNativeFirebaseAuthPackage(),
                new AsyncStoragePackage(),
                new RNGestureHandlerPackage(),
                new ReanimatedPackage()
        );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }
}
