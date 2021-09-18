import * as React from 'react';
import { useAppSelector } from '../../../store/hooks';

interface ISecurityHeadersCardProps {}

export const SecurityHeadersCard: React.FunctionComponent<ISecurityHeadersCardProps> = (props) => {
    const securityHeaders = useAppSelector((state) => state.securityOptions.securityHeaders);
    return <></>;
};
