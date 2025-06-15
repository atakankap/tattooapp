import { saveToSecureStore, getFromSecureStore, deleteFromSecureStore } from '../src/utils/secure';

describe('secureStore utils', () => {
  it('should save, retrieve and delete a value', async () => {
    const key = 'test_key';
    const value = 'test_value';
    await saveToSecureStore(key, value);
    const stored = await getFromSecureStore(key);
    expect(stored).toBe(value);
    await deleteFromSecureStore(key);
    const afterDelete = await getFromSecureStore(key);
    expect(afterDelete).toBeNull();
  });
});
