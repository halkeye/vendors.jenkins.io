import * as React from 'react';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {LocalPropTypes} from '../proptypes';
import {by639_1} from 'iso-language-codes';

export const VendorBox = ({vendor, ALL_FEATURES}) => {
    return (
        <div key={vendor.id} className="border border-dark rounded mb-3" id={`vendor_${vendor.fields.slug}`}>
            <div className="pull-right">
                <a href={`#vendor_${vendor.fields.slug}`} className="close" aria-label="Permant Link">
                    <ion-icon name="link-outline" />
                </a>
            </div>
            <div className="row">
                <div className="col-md-3 d-none d-md-block mx-auto">
                    <GatsbyImage image={getImage(vendor.logo)} alt={`${vendor.name} Logo`} />
                </div>
                <div className="col-md-9">
                    <h3 className="display-3">{vendor.name}</h3>
                    <div>
                        <strong>Features: </strong>
                        <ul className="list-inline d-inline-block">
                            {ALL_FEATURES.filter(feature => vendor.features[feature.key]).map(feature => (
                                <li className="list-inline-item" key={feature.key} style={{
                                    display: 'inline-block',
                                    color: vendor.features[feature.key] ? 'green' : '',
                                }}>
                                    {vendor.features[feature.key] && <ion-icon name="checkmark-circle" />}
                                    {' '}
                                    {feature.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p>
                        <strong>Languages:</strong>
                        {' '}
                        {vendor.languages.map(lang => by639_1[lang]?.name || lang).join(', ')}
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

