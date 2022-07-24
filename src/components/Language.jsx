import * as React from 'react';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';

export const Language = ({language}) => (<>{ISO6391.getName(language) || language}</>);
Language.propTypes = {
  language: PropTypes.string.isRequired,
};
Language.displayName = 'Language';

