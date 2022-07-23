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
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired
        }).isRequired,
        languages: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    feature: PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        description: PropTypes.string
    })
};
export default LocalPropTypes;
