import { render, screen } from '@testing-library/react';
import NotFound from './NotFound.js';




describe('Test for NotFound', () => {
    test('must to display a title', () => {
    render(<NotFound />);
    expect(screen.queryByText(/not found/i)).toBeInTheDocument();
    });

    test('must display an image', () => {
        const {getByTestId} = render(<NotFound />)
        expect(getByTestId('not_found')).toBeInTheDocument()
    })
})

