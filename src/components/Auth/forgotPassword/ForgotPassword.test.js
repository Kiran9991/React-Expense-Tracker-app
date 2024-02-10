import { render, screen } from '@testing-library/react';
import ForgotPassword from "./ForgotPassword";

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ email: 'test@gmail.com' }],
        });
        render(<ForgotPassword/>)

        const authElement = await screen.findByRole('authResponse');
        expect(authElement).toBe(true);
    })
})