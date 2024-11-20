# Ionic + Capacitor Project

This project is built using the **Ionic Framework** with **Capacitor**, a native runtime for hybrid web apps. The guide below provides the steps for setup, development, and deployment.

## Prerequisites

Before starting, ensure that the following tools are installed:

- [Node.js](https://nodejs.org) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Ionic CLI](https://ionicframework.com/docs/cli) (installed globally)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## Installation and Setup

Follow these steps to set up the project:

1. **Install Ionic CLI**  
   Run the command below to install the Ionic CLI globally:
 ```npm install -g @ionic/cli``` 
3. Create a New Ionic Project
   Run the command below to install the Ionic CLI globally:
 ``` ionic start myApp blank --type=angular```
3. Install Capacitor
Add Capacitor to your project using the command:
``` npm init @capacitor/app```
4. Running the Application
```ionic serve```
5. Using Capacitor for Native Functionality
   ```ionic capacitor add android ```
   ```ionic capacitor add ios ```
6.  Open in IDE
   ```ionic capacitor open android ``` ```cap open android```
   ```ionic capacitor open ios ``` ```cap open ios```
7. Synchronize Changes
   ```ionic capacitor sync ```
8. Testing on Device
 - Build the application ```ionic build``` 
 - Sync with the native platform ```ionic capacitor sync``` 
 - Run the app directly on a connected device ```ionic capacitor run android``` ```ionic capacitor run ios```
