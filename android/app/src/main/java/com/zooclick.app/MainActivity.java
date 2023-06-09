package com.zooclick.app;

import android.os.Bundle;

import expo.modules.ReactActivityDelegateWrapper;
import com.facebook.react.ReactActivityDelegate;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

 @Override
 protected void onCreate(Bundle savedInstanceState) {
   super.onCreate(null);
 }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "zooclick.app";
  }

  @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegateWrapper(this,
        new ReactActivityDelegate(this, getMainComponentName())
      );
    }
}
