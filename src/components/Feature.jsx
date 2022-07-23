import * as React from 'react';
import PropTypes from 'prop-types';
import {LocalPropTypes} from '../proptypes';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const FeatureDescriptionOverlay = ({feature, children, ...props}) => {
    if (feature.description) {
        const overlay = (tooltipProps) => <Tooltip id={`tooltop-${feature.key}`} {...tooltipProps}>{feature.description}</Tooltip>;
        return (<OverlayTrigger overlay={overlay} {...props}>{children}</OverlayTrigger>);
    }
    return <>{children}</>;
};
FeatureDescriptionOverlay.displayName = 'FeatureDescriptionOverlay';
FeatureDescriptionOverlay.propTypes = {
    feature: LocalPropTypes.feature.isRequired,
    children: PropTypes.node
};

export const Feature = ({feature, checked}) => {
    let color;
    let icon;
    if (checked === true) {
        color = 'green';
        icon = (<ion-icon name="checkmark-circle" />);
    } else if (checked === false) {
        color = 'gray';
        icon = <ion-icon name="close-circle" />;
    } else {
        color = '';
        icon = <></>;
    }
    return (
        <li className="list-inline-item" key={feature.key} style={{display: 'inline-block', color: color}}>
            <FeatureDescriptionOverlay feature={feature}>
                <span>
                    {icon}
                    {' '}
                    {feature.label}
                </span>
            </FeatureDescriptionOverlay>
        </li>
    );
};
Feature.propTypes = {
    feature: LocalPropTypes.feature.isRequired,
    checked: PropTypes.bool,
};
Feature.displayName = 'Feature';
