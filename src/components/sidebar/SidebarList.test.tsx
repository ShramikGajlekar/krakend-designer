import { render } from '@testing-library/react';
import React from 'react';
import SidebarList, { SidebarListProps } from './SidebarList';

describe('SidebarList with props', () => {
    it('match a snapshot', () => {
        const props: SidebarListProps = {
            title: 'Title',
            endpoints: ['endpoint1', 'endpoint2'],
        };
        const { container } = render(<SidebarList title={props.title} endpoints={props.endpoints} />);
        expect(container).toMatchSnapshot();
    });
});
