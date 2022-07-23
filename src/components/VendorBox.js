import * as React from 'react';
import PropTypes from 'prop-types';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {LocalPropTypes} from '../proptypes';
import ISO6391 from 'iso-639-1';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const FeatureDescriptionOverlay = ({feature, children, ...props}) => {
    if (feature.description) {
        const overlay = (props) => <Tooltip id={`tooltop-${feature.key}`} {...props}>{feature.description}</Tooltip>;
        return (<OverlayTrigger placement="right" overlay={overlay} {...props}>{children}</OverlayTrigger>);
    }
    return <>{children}</>;
};
FeatureDescriptionOverlay.displayName = 'FeatureDescriptionOverlay';
FeatureDescriptionOverlay.propTypes = {
    feature: LocalPropTypes.feature.isRequired,
    children: PropTypes.node
};

export const VendorBoxFeature = ({feature}) => (
    <li className="list-inline-item" key={feature.key} style={{display: 'inline-block', color: 'green'}}>
        <FeatureDescriptionOverlay feature={feature}>
            <span>
                <ion-icon name="checkmark-circle" />
                {' '}
                {feature.label}
            </span>
        </FeatureDescriptionOverlay>
    </li>
);
VendorBoxFeature.propTypes = {
    feature: LocalPropTypes.feature.isRequired
};
VendorBoxFeature.displayName = 'VendorBoxFeature';


export const VendorBox = ({vendor, ALL_FEATURES}) => {
    return (
        <div key={vendor.id} className="border border-dark rounded mb-3" id={`vendor_${vendor.fields.slug}`}>
            <div className="pull-right">
                <a href={`#vendor_${vendor.fields.slug}`} className="close" aria-label="Permant Link">
                    <ion-icon name="link-outline" />
                </a>
            </div>
            <div className="row">
                <div className="col-md-3 d-none d-md-block">
                    <div className="d-flex justify-content-center mx-auto h-100">
                        {vendor.logo.childImageSharp && <GatsbyImage image={getImage(vendor.logo)} alt={`${vendor.name} Logo`} className="mx-auto" />}
                        {!vendor.logo.childImageSharp && <img src={vendor.logo.publicURL} alt={`${vendor.name} Logo`} className="mx-auto" />}
                    </div>
                </div>
                <div className="col-md-9">
                    <h3 className="display-3">{vendor.name}</h3>
                    <div>
                        <strong>Features: </strong>
                        <ul className="list-inline d-inline-block">
                            {ALL_FEATURES.filter(feature => vendor.features[feature.key]).map(feature => (
                                <VendorBoxFeature feature={feature} key={feature.key} />
                            ))}
                        </ul>
                    </div>
                    <p>
                        <strong>Languages:</strong>
                        {' '}
                        {vendor.languages.map(lang => ISO6391.getName(lang) || lang).join(', ')}
                    </p>
                </div>
            </div>
        </div>
    );
};

VendorBox.propTypes = {
    ALL_FEATURES: LocalPropTypes.ALL_FEATURES.isRequired,
    vendor: LocalPropTypes.vendor.isRequired,
};
VendorBox.displayNAme = 'VendorBox';

