# TattooApp

## Proje Hakkında

TattooApp, React Native (Expo) ile geliştirilmiş, dövme stüdyolarını haritada bulabileceğiniz, favori dövmeleri kaydedebileceğiniz ve çeşitli filtrelerle arama yapabileceğiniz modern bir mobil uygulamadır.

## Kullanılan Teknolojiler

- React Native (TypeScript)
- Expo
- Redux (Global State Management)
- React Navigation
- AsyncStorage (Favori dövmeleri kaydetmek için)
- Jest & React Native Testing Library (Birim testleri)
- react-native-safe-area-context
- Harita: react-native-maps

## Kurulum

1. Repoyu klonlayın:
   ```sh
   git clone <repo-url>
   cd tattooapp-ts
   ```
2. Bağımlılıkları yükleyin:
   ```sh
   npm install
   ```
3. Uygulamayı başlatın:
   ```sh
   npm start
   ```
4. Expo Go ile QR kodu okutun veya emülatörde çalıştırın.

## Proje Mimarisi

- **Redux** ile global state yönetimi yapılır. (Favoriler, dövme listesi, kullanıcı ayarları vs.)
- **React Navigation** ile ekranlar arası geçiş sağlanır.
- **AsyncStorage** ile favori dövmeler kalıcı olarak saklanır.
- Kodlar `src/` klasöründe organize edilmiştir: `screens/`, `components/`, `store/`, `constants/`.

## Native Özellikler

- **Konum (Geolocation):** Harita üzerinde stüdyoları göstermek için kullanılır.
- **AsyncStorage:** Favori dövmeleri cihazda kalıcı olarak saklamak için kullanılır.
- **SecureStore:** Hassas verileri (örn. kullanıcı token) güvenli bir şekilde saklamak için kullanılır.

## Test

- Testler `__tests__` klasöründe yer alır.
- Jest and React Native Testing Library are set up for unit tests.
- Coverage for Redux logic, SecureStore utils, and persist logic.
- Example tests for Redux slice, SecureStore, and UI components included.

To run tests:
```sh
npm test
```

To view coverage:
```sh
npm test -- --coverage
```

## Offline Mod

- Favori dövmeler ve son çekilen dövme listesi internet olmasa da cihazda saklanır.
- Redux Persist ile global state offline tutulur.
- App works offline for browsing and managing favorites.
- User profile and all tattoos state are stored offline (Redux Persist).

## Hata Yönetimi

- API isteklerinde ve kritik işlemlerde try/catch ile hata yakalama ve kullanıcıya bildirim gösterme uygulanır.
- Error handling for API requests and critical operations.

## Güvenlik

- Hassas veriler (örn. kullanıcı token) ileride SecureStore ile saklanabilir.
- Input validation ve güvenli API bağlantısı sağlanır (geliştirilecek).

## Build & Deployment

- Android için APK oluşturmak:
  ```sh
  eas build -p android --profile preview
  ```
- iOS için IPA oluşturmak:
  ```sh
  eas build -p ios --profile preview
  ```
- Daha fazla bilgi için: https://docs.expo.dev/build/introduction/

## Katkı ve Lisans

- Proje açık kaynak olarak geliştirilmektedir.
- Katkı yapmak için PR gönderebilirsiniz.

---

Her türlü soru ve katkı için iletişime geçebilirsiniz!
