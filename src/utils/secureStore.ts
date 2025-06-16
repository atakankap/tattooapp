import * as SecureStore from 'expo-secure-store';

/**
 * Save a value securely on the device
 * @param key string
 * @param value string
 */
export async function saveSecureValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

/**
 * Retrieve a value securely from the device
 * @param key string
 */
export async function getSecureValue(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key);
}

/**
 * Delete a value securely from the device
 * @param key string
 */
export async function deleteSecureValue(key: string) {
  await SecureStore.deleteItemAsync(key);
}
