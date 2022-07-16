import PropTypes from 'prop-types';

export const LocalPropTypes = {
    ALL_FEATURES: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired),
    vendor: PropTypes.shape({
        id: PropTypes.string.isRequired,
        logo: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        features: PropTypes.object.isRequired,
        languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
};
export default LocalPropTypes;
