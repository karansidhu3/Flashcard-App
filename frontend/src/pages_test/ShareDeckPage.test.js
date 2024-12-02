import { validateShareDeck } from "../pages/ShareDeck";

describe('validateShareDeck', () => {
    it('should return an error if no sharing option is selected', () => {
        const result = validateShareDeck('', '');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Please select a sharing option.');
    });

    it('should return an error if sharing with a user and no username is provided', () => {
        const result = validateShareDeck('user', '');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Please enter a username to share with.');
    });

    it('should return success if sharing with a user and a username is provided', () => {
        const result = validateShareDeck('user', 'validUsername');
        expect(result.success).toBe(true);
    });

    it('should return success if making the deck public', () => {
        const result = validateShareDeck('public', '');
        expect(result.success).toBe(true);
    });
});
