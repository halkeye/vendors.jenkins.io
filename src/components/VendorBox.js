import * as React from 'react';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import {graphql, useStaticQuery} from 'gatsby';
import {LocalPropTypes} from '../proptypes';
import ISO6391 from 'iso-639-1';
import {Feature} from './Feature';

export const VendorBox = ({vendor}) => {
    const {allFeaturesYaml} = useStaticQuery(graphql`
    query {
      allFeaturesYaml {
        ALL_FEATURES: edges {
          node {
            key
            label
            description
          }
        }
      },
    }
  `);
    const ALL_FEATURES = allFeaturesYaml.ALL_FEATURES.map(({node}) => node);
    const vendorFeatures = vendor.features.map(f => f.key);
    return (
        <div key={vendor.id} id={`vendor_${vendor.fields.slug}`}>
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
                            {ALL_FEATURES.map(feature => (<Feature feature={feature} key={feature.key} checked={vendorFeatures.includes(feature.key)} />))}
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
    vendor: LocalPropTypes.vendor.isRequired,
};
VendorBox.displayNAme = 'VendorBox';

