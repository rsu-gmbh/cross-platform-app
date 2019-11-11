# Crypta a Crossplatform Password Manager

This is a example for a cross platform app.
We are using [Angular](https://angular.io/) to create a progressive web app.
[Electron](https://electronjs.org/) to create the native desktop app.
[Capacitor](https://capacitor.ionicframework.com/) to create the hybrid mobile version.

## Requirements

The progressive web app & Electron:

- [Nodejs](https://nodejs.org/en/)

The hybrid app:

- [Nodejs](https://nodejs.org/en/)
- [Android Studio](https://developer.android.com/studio)
- [XCode](https://developer.apple.com/xcode/)

## Quick Start

First install all dependencies.

    npm install

To run the web app.

    ng serve

To run the progressive web app you need https. See the section Development Server.

To run the electron app.

    npm run electron:lite

To run the hybrid app (Android Studio)

    npx cap open android

Then run the app using Android Studio.

## Development Server

First we have to create certificates for your localhost.

### Configure your localhost certificates

#### Create CA Root Certificate

    openssl req -batch -new -newkey rsa:2048 -nodes \
    -keyout ca-key.pem -x509 -out ca.pem -days 3650 -subj "/CN=A localhost CA"

#### Create a CSR for localhost, then sign it by CA

    openssl req -batch -new -newkey rsa:2048 -nodes \
    -keyout crypta.rsu-reifen.key.pem -subj /CN=crypta.rsu-reifen.de | \
    openssl x509 -req -CAkey ca-key.pem -CA ca.pem -CAcreateserial -out crypta.rsu-reifen.pem \
    -days 365 -extfile <(echo subjectAltName=DNS:crypta.rsu-reifen.de,IP:192.168.0.45)

#### Add the CA cert to your browser (here Google Chrome)

Settings -> Advanced -> Privacy and security -> Manage certificates -> Authorities -> Import

Now choose your `ca.pem` you created above.

### Run the npm http-server with your certs

    ./node_modules/http-server/bin/http-server -p 8080 --ssl -C server/crypta.rsu-reifen.pem -K server/crypta.rsu-reifen.key.pem  ./dist/crossplatform-app/

Check the paths to your key and cert.

## Electron

Build your app:

    ng build --base-href ./

After the build you have to fix the `<script>` tags and replace `type="module"` with `type="text/javascript"`. Fix them, then:

    npm run electron:dist

## PWA

https://entwickler.de/online/javascript/progressive-web-apps-angular-579882090.html

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.4.

## PWA Server

Build your app

    ng build --prod

Start your development server (see above).

## Capacitor

    ng build --base-href ./

After the build you have to fix the `<script>` tags and replace `type="module"` with `type="text/javascript"`. Fix them, then:

    npx cap copy android
    npx cap open android

## Android

If you want to test a local version of your pwa, with an android emulator you have to edit your emulator's hosts file.

Start the emulator with your terminal

Old SDKs:

    <SDK_HOME>/tools/emulator -avd <DEVICE_NAME> -writable-system

New SDKs:

    <SDK_HOME>/emulator/emulator -avd <DEVICE_NAME> -writable-system

Now you can use adb to pull and push the hosts file.

    adb root
    adb remount
    adb pull /system/etc/hosts hosts
    vim hosts
    adb push hosts /system/etc/hosts

An example to redirect "example.com" to your development machine:

    10.0.2.2 example.com
