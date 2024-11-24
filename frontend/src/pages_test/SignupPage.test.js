import { validateSignup } from "../pages/SignupPage";

describe('validateSignup', () => {
  it('should return an error if username, email, or password is empty', () => {
    const result = validateSignup('', 'test@example.com', 'password');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Please fill in all fields.');
  });

  it('should return an error if password is less than 6 characters', () => {
    const result = validateSignup('username', 'test@example.com', '123');
    expect(result.success).toBe(false);
    expect(result.error).toBe('Password must be at least 6 characters long.');
  });

  it('should return success if all fields are valid', () => {
    const result = validateSignup('username', 'test@example.com', 'password123');
    expect(result.success).toBe(true);
  });
});