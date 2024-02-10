import { render, screen } from '@testing-library/react';
import MainNavigation from './MainNavigation';

describe('Async component', () => {
    test('renders posts if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{ userName: 'test', url:'xyx' }],
        });
        render(<MainNavigation/>)

        const userDataObj = await screen.findByRole('userObj');
        expect(userDataObj).toBe(true);
    })
})