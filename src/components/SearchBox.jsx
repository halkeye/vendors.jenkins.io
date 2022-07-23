import * as React from 'react';
import PropTypes from 'prop-types';
import ISO6391 from 'iso-639-1';
import {Row, Col, Form, Collapse, Button} from 'react-bootstrap';
import {LocalPropTypes} from '../proptypes';
import * as styles from './SearchBox.module.css';

export const SearchBox = ({ALL_FEATURES, ALL_LANGUAGES, setFilters, filters}) => {
    const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false);

    const onChangeFeature = (e) => {
        const feature = e.target.dataset.feature;
        const features = {...filters.features};
        if (features[feature]) {
            delete features[feature];
        } else {
            features[feature] = true;
        }
        setFilters({...filters, features: {...features}});
    };
    const onChangeLanguage = (e) => {
        const language = e.target.dataset.lang;
        const languages = {...filters.languages};
        if (languages[language]) {
            delete languages[language];
        } else {
            languages[language] = true;
        }
        setFilters({...filters, languages: {...languages}});
    };
    const onChangeVendorName = (e) => {
        setFilters({...filters, name: e.target.value});
    };
    return (
        <div className={`jumpbotron rounded mx-auto ${styles.root}`}>
            <Row>
                <Col>
                    <Form.Control type="text" label={'Name'} onChange={onChangeVendorName} placeholder="Vendor Name" />
                </Col>
            </Row>
            <Collapse in={!showAdvancedSearch}>
                <Row className="pt-2 text-right">
                    <Col>
                        <Button
                            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                            aria-controls="toggle-advanced-search-tex"
                            aria-expanded={showAdvancedSearch}
                            className="mx-auto"
                        >
                            <ion-icon name="chevron-down-circle-outline" />
                            {' '}
                            Advanced
                        </Button>
                    </Col>
                </Row>
            </Collapse>
            <Collapse in={showAdvancedSearch}>
                <Row className="flex-xl-nowrap">
                    <Col xs={12} md={6}>
                        <h3>Language</h3>
                        {ALL_LANGUAGES.map(lang => (<Form.Check
                            key={lang}
                            type="checkbox"
                            id={`checkbox-lang-${lang}`}
                            label={ISO6391.getName(lang)|| lang}
                            onChange={onChangeLanguage}
                            value={filters.languages[lang]}
                            data-lang={lang}
                        />))}
                    </Col>
                    <Col xs={12} md={6}>
                        <h3>Features</h3>
                        {ALL_FEATURES.map(feature => (
                            <Form.Check
                                key={feature.key}
                                type="checkbox"
                                id={`checkbox-feature-${feature.key}`}
                                label={feature.label}
                                onChange={onChangeFeature}
                                data-feature={feature.key}
                                value={filters.features[feature.key]}
                            />
                        ))}
                    </Col>
                </Row>
            </Collapse>
        </div>
    );
};

SearchBox.propTypes = {
    ALL_LANGUAGES: PropTypes.arrayOf(PropTypes.string).isRequired,
    ALL_FEATURES: LocalPropTypes.ALL_FEATURES.isRequired,
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        name: PropTypes.string,
        features: PropTypes.object.isRequired,
        languages: PropTypes.object.isRequired,
    }).isRequired,
};
