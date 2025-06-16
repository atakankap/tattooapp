import { saveSecureValue, getSecureValue, deleteSecureValue } from '../src/utils/secureStore';

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(() => Promise.resolve('mocked-value')),
  deleteItemAsync: jest.fn(),
}));

describe('secureStore utils', () => {
  it('saves a value', async () => {
    await saveSecureValue('token', 'abc123');
    expect(require('expo-secure-store').setItemAsync).toHaveBeenCalledWith('token', 'abc123');
  });

  it('gets a value', async () => {
    const value = await getSecureValue('token');
    expect(value).toBe('mocked-value');
  });

  it('deletes a value', async () => {
    await deleteSecureValue('token');
    expect(require('expo-secure-store').deleteItemAsync).toHaveBeenCalledWith('token');
  });
});
