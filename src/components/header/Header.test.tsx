import { render } from '@testing-library/react';
import React from 'react';
import { Header } from './Header';

describe('Header with default props', () => {
    it('match a snapshot', () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
});

describe('Header with title & logo', () => {
    it('match a snapshot', () => {
        const { container } = render(<Header logoURL="/logo-white.png" title="Header" />);
        expect(container).toMatchSnapshot();
    });
});
