import reducer, { updateProfileSecure } from '../src/store/userSlice';

describe('userSlice', () => {
  it('should update profile and call SecureStore for email', async () => {
    const dispatch = jest.fn();
    const profile = { name: 'Test', email: 'test@example.com' };
    // Mock secure store
    jest.spyOn(require('../src/utils/secure'), 'saveToSecureStore').mockResolvedValue(undefined);
    await updateProfileSecure(profile)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({ type: 'user/updateProfile', payload: profile });
    expect(require('../src/utils/secure').saveToSecureStore).toHaveBeenCalledWith('user_email', 'test@example.com');
  });
});
