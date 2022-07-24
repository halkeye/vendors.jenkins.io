import * as React from 'react';
import {Link} from 'gatsby';
import {useAllFeatures} from '../hooks';
import {LocalPropTypes} from '../proptypes';
import {Feature} from './Feature';
import {Language} from './Language';
import {VendorLogo} from './VendorLogo';

export const VendorBox = ({vendor}) => {
  const ALL_FEATURES = useAllFeatures();
  const vendorFeatures = vendor.features.map(f => f.key);
  return (
    <div key={vendor.id} id={`vendor_${vendor.fields.slug}`} className="card" style={{width: '20rem', display: 'relative'}}>
      <div style={{top: 0, right: 0, position: 'absolute'}}>
        <a href={`#vendor_${vendor.fields.slug}`} className="close" aria-label="Permant Link">
          <ion-icon name="link-outline" />
        </a>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3 d-none d-md-block">
            <div className="d-flex justify-content-center mx-auto h-100">
              <VendorLogo logo={vendor.logo} alt={`${vendor.name} Logo`} className="text-center mx-auto" style={{height: '70px'}} />
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="card-title text-center"><Link to={vendor.fields.slug}>{vendor.name}</Link></h2>
          </div>
        </div>
        <div className="card-text">
          <div>
            <strong>Features: </strong>
            <ul className="">
              {ALL_FEATURES.map(feature => (<li key={feature.key}><Feature feature={feature} checked={vendorFeatures.includes(feature.key)} /></li>))}
            </ul>
          </div>
          <p>
            <strong>Languages:</strong>
            <ul className="">
              {vendor.languages.map(lang => <li key={lang}><Language language={lang} /></li>)}
            </ul>
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

