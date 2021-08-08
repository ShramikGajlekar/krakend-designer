import { render } from '@testing-library/react';
import React from 'react';
import { LayoutProps, Layout } from './Layout';

describe('Layout with props', () => {
    it('match a snapshot', () => {
        const props: LayoutProps = {
            headerOptions: {
                title: 'title',
            },
        };
        const { container } = render(<Layout headerOptions={props.headerOptions} />);
        expect(container).toMatchSnapshot();
    });
});
