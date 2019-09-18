
package com.reactlibrary;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.util.Log;

import android.support.compat.R.integer;
import java.lang.Math;

import java.util.List;

import com.facebook.react.bridge.Callback;

public class RNJavaCalculatorModule extends ReactContextBaseJavaModule {
  static {
    System.loadLibrary("native_calculator.jni"); // this Loads the library when the class is loaded
  }

  private final ReactApplicationContext reactContext;

  private double previousInputValue = 0;
  private double result = 0;
  private int decimal = 0;
  private String lastSymbol = "=";

  public RNJavaCalculatorModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNJavaCalculator";
  }

  // @ReactMethod
  // public void helloWorld(Callback callback) {
  //   String hello = helloWorldJNI();
  //   callback.invoke(hello);
  // }

  @ReactMethod
  public void numberImputHandler(double keyInput, double inputValue, int pDecimalState, Callback callback) {
    double result = keyInput;
    int temp = pDecimalState;
    if (pDecimalState == 0) {
      result = (inputValue * 10) + keyInput;
      decimal = 0;
    } if (pDecimalState > 0) {
      result = (keyInput / Math.pow(10, temp)) + inputValue;
      decimal = temp + 1;
    }
    callback.invoke(result, decimal);
  }

  @ReactMethod
  public void calculator(double inputValue, String symbol, Callback callback) {
    switch (lastSymbol) {
      case "+":
        previousInputValue += inputValue;
        lastSymbol = symbol;
        break;
      case "-":
        previousInputValue -= inputValue;
        lastSymbol = symbol;
        break;
      case "*":
        previousInputValue *= inputValue;
        lastSymbol = symbol;
        break;
      case "/":
        previousInputValue /= inputValue;
        lastSymbol = symbol;
        break;
      case "=":
        previousInputValue = inputValue;
        lastSymbol = symbol;
    }
    if (symbol == "=") {
      result = previousInputValue;
      previousInputValue = 0;
      lastSymbol = symbol;
      callback.invoke(result);
    } else {
    callback.invoke(previousInputValue);
    }
  }
}