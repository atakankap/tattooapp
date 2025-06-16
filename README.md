# TattooApp

A modern cross-platform mobile application for discovering tattoo studios, browsing artist portfolios, saving favorite tattoos, and booking appointments. Built with React Native (Expo), Redux Toolkit, and best practices for scalability, security, and offline support.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [State Management](#state-management)
- [Native Features](#native-features)
- [Responsiveness](#responsiveness)
- [Offline Mode](#offline-mode)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Build & Deployment](#build--deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
TattooApp helps users find tattoo studios, explore artists and their portfolios, save favorite tattoos, and book appointments. The app is designed to be robust, secure, and user-friendly across all iOS and Android devices.

## Features
- Find and view tattoo studios on a map (Geolocation)
- Browse artist profiles, galleries, and reviews
- Save favorite tattoos and artists
- Book appointments with artists
- Push notifications (Expo Notifications)
- Securely store sensitive data (Expo SecureStore)
- Offline support for favorites and user settings
- Responsive UI for all screen sizes and orientations
- Error boundaries and user-friendly error messages
- Unit tests for logic and components

## Tech Stack
- **React Native (TypeScript, Expo)**
- **Redux Toolkit** (state management)
- **React Navigation** (screen navigation)
- **AsyncStorage & SecureStore** (data storage)
- **Jest & React Native Testing Library** (testing)
- **ESLint & Prettier** (code quality)
- **Expo Location, Notifications, SecureStore** (native modules)

## Architecture
- Modular codebase: `src/screens/`, `src/components/`, `src/store/`, `src/constants/`, `src/utils/`
- **Redux Toolkit** for global state (favorites, tattoos, user config)
- **React Navigation** for screen transitions and parameter passing
- **AsyncStorage & SecureStore** for persistent and secure data
- **ErrorBoundary** component for catching rendering errors

## Folder Structure
```
tattooapp-ts/
├── src/
│   ├── components/         # Reusable UI components (e.g. ErrorBoundary)
│   ├── screens/            # App screens (e.g. ArtistProfileScreen)
│   ├── store/              # Redux slices and store config
│   ├── utils/              # Utility functions (e.g. secureStore)
│   ├── constants/          # Colors, spacing, etc.
│   └── ...
├── __tests__/              # Unit and integration tests
├── assets/                 # Images and static assets
├── App.tsx                 # App entry point
├── package.json            # Project config and scripts
├── .eslintrc.js            # ESLint config
├── .prettierrc             # Prettier config
└── README.md               # Project documentation
```

## State Management
- **Redux Toolkit** is used for predictable, scalable global state management.
- State slices: tattoos, favorites, user config, etc.
- Async logic (e.g. API calls) handled with thunks.
- **Redux Persist** can be used for offline state.

## Native Features
- **Geolocation:** Show studios on a map (Expo Location)
- **AsyncStorage:** Save favorites and user settings
- **SecureStore:** Securely store sensitive data (e.g., tokens)
- **Push Notifications:** Notify users about bookings (Expo Notifications)

## Responsiveness
- Layouts built with Flexbox and `Dimensions` API
- Styles use relative units and safe area insets
- Tested on multiple screen sizes and orientations

## Offline Mode
- Favorites and user data are stored offline using AsyncStorage
- App remains usable without internet for browsing and managing favorites
- Data automatically syncs when connection is restored

## Error Handling
- All async operations and API calls use `try/catch` blocks
- User-friendly error messages via `Alert`
- **ErrorBoundary** component displays fallback UI on render errors

## Security
- Sensitive data is stored with Expo SecureStore
- Input validation and secure API communication
- See `src/utils/secureStore.ts` for example usage

## Testing
- **Jest** and **React Native Testing Library** are set up
- Tests are in the `__tests__/` folder
- Example tests for Redux logic, SecureStore utils, and UI components

To run tests:
```sh
npm test
```

To view coverage:
```sh
npm test -- --coverage
```

## Code Quality
- Code is formatted with **Prettier** and checked with **ESLint**
- TypeScript ensures type safety and readability

## Build & Deployment
- Build Android APK:
  ```sh
  eas build -p android --profile preview
  ```
- Build iOS IPA:
  ```sh
  eas build -p ios --profile preview
  ```
- See [Expo Build Docs](https://docs.expo.dev/build/introduction/) for more info

## Contributing
- Open to contributions! Please open a PR for improvements
- Follow code style guidelines and write tests for new features

## License
MIT License

---

For any questions or feedback, feel free to contact the maintainer.


A modern mobile app built with React Native (Expo) for discovering tattoo studios, saving favorite tattoos, and exploring artists on a map. The app is designed with best practices in architecture, state management, testing, and security.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & State Management](#architecture--state-management)
- [Responsiveness](#responsiveness)
- [Native Device Features](#native-device-features)
- [Offline Mode](#offline-mode)
- [Error Handling](#error-handling)
- [Security](#security)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Build & Deployment](#build--deployment)
- [Contributing & License](#contributing--license)

---

## Project Overview
TattooApp is a cross-platform mobile app that helps users find tattoo studios, browse artist portfolios, and manage their favorite tattoos. The app supports offline mode, secure data storage, and leverages native device features for a seamless experience.

## Features
- Find tattoo studios on a map (Geolocation)
- Browse artist profiles and galleries
- Save favorite tattoos (AsyncStorage)
- Book appointments with artists
- Push notifications (Expo Notifications)
- Securely store sensitive data (Expo SecureStore)
- Offline support for favorites and user config
- Responsive UI for all screen sizes
- Error boundaries and user-friendly error messages
- Unit tests for logic and components

## Tech Stack
- **React Native (TypeScript, Expo)**
- **Redux Toolkit** (global state management)
- **React Navigation** (screen navigation)
- **AsyncStorage & SecureStore** (data storage)
- **Jest & React Native Testing Library** (testing)
- **ESLint & Prettier** (code quality)

## Architecture & State Management
- **Redux Toolkit** is used for global state (favorites, tattoos, user config) for predictability and scalability.
- **React Navigation** manages screen transitions and parameter passing.
- **AsyncStorage & SecureStore** persist user data and sensitive info.
- Code is modular: `src/screens/`, `src/components/`, `src/store/`, `src/constants/`, `src/utils/`.

## Responsiveness
- Flexbox layouts and the `Dimensions` API ensure the app looks good on all devices and orientations.
- Styles use relative units, percentages, and safe area insets for notched devices.

## Native Device Features
- **Geolocation:** Shows studios on the map.
- **AsyncStorage:** Saves favorites and user settings.
- **SecureStore:** Stores sensitive data (e.g., user tokens) securely.
- **Push Notifications:** (via Expo Notifications)

## Offline Mode
- Favorites and user data are stored offline using AsyncStorage and Redux Persist.
- The app remains usable without an internet connection for browsing and managing favorites.
- Data syncs when connection is restored.

## Error Handling
- All async operations and API calls use `try/catch` blocks.
- User-friendly error messages via `Alert`.
- Error boundaries catch rendering errors and display fallback UI.

## Security
- Sensitive data is stored with Expo SecureStore.
- Input validation and secure API communication are implemented.
- See `src/utils/secureStore.ts` for usage.

## Testing
- **Jest** and **React Native Testing Library** are set up.
- Tests are in the `__tests__/` folder.
- Example tests cover Redux logic, SecureStore utils, and UI components.

Run tests:
```sh
npm test
```

View coverage:
```sh
npm test -- --coverage
```

## Code Quality
- Code is formatted with **Prettier** and checked with **ESLint**.
- TypeScript ensures type safety and readability.

## Build & Deployment
- Build Android APK:
  ```sh
  eas build -p android --profile preview
  ```
- Build iOS IPA:
  ```sh
  eas build -p ios --profile preview
  ```
- See [Expo Build Docs](https://docs.expo.dev/build/introduction/) for more info.

## Contributing & License
- Open to contributions! Please open a PR for improvements.
- MIT License.

---

For any questions or feedback, feel free to contact the maintainer.


