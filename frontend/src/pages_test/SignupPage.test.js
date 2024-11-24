import { handleSignup } from "../pages/SignupPage";

describe('handleSignup', () => {
  test('returns false if any field is empty', () => {
    expect(handleSignup('', 'test@example.com', 'password123')).toBe(false);
    expect(handleSignup('JohnDoe', '', 'password123')).toBe(false);
    expect(handleSignup('JohnDoe', 'test@example.com', '')).toBe(false);
  });

  test('returns true if all fields are filled', () => {
    expect(handleSignup('JohnDoe', 'john@example.com', 'password123')).toBe(true);
  });

  test('returns false if password is less than 6 characters', () => {
    expect(handleSignup('Tim', 'tim@example.com', '123')).toBe(false)
    expect(handleSignup('Tim', 'tim@example.com', 'timlikescake123')).toBe(true)
  });
});