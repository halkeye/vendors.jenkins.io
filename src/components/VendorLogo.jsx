import * as React from 'react';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

export const VendorLogo = ({logo, alt, ...props}) => {
  if (!logo) { return null; }
  if (logo.childImageSharp) {
    return <GatsbyImage image={getImage(logo)} alt={alt} {...props} />;
  }
  return <img src={logo.publicURL} alt={alt} {...props} />;
};

VendorLogo.propTypes = {
  logo: PropTypes.object.isRequired,
  alt: PropTypes.string,
};

VendorLogo.displayName = 'VendorLogo';

VendorLogo.defaultProps = {
  alt: 'Logo for Vendor'
};
