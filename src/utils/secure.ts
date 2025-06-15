import * as SecureStore from 'expo-secure-store';

export async function saveToSecureStore(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (e) {
    // Hata yönetimi
    console.warn('SecureStore save error:', e);
  }
}

export async function getFromSecureStore(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.warn('SecureStore get error:', e);
    return null;
  }
}

export async function deleteFromSecureStore(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.warn('SecureStore delete error:', e);
  }
}
