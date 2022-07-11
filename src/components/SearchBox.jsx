import * as React from 'react';
import PropTypes from 'prop-types';
import {by639_1} from 'iso-language-codes';
import {Row, Col, Form} from 'react-bootstrap';
import * as styles from './SearchBox.module.css';

export const SearchBox = ({ALL_FEATURES, ALL_LANGUAGES, setFilters, filters}) => {
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
        <div className={`jumpbotron ${styles.root}`}>
            <Row>
                <Col><Form.Control type="text" label={'Name'} onChange={onChangeVendorName} placeholder="Vendor Name" /></Col>
            </Row>
            <Row className="flex-xl-nowrap">
                <Col xs={12} md={6}>
                    {ALL_LANGUAGES.map(lang => (<Form.Check
                        key={lang}
                        type="checkbox"
                        id={`checkbox-lang-${lang}`}
                        label={by639_1[lang]?.name || lang}
                        onChange={onChangeLanguage}
                        value={filters.languages[lang]}
                        data-lang={lang}
                    />))}
                </Col>
                <Col xs={12} md={6}>
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
        </div>
    );
};

SearchBox.propTypes = {
    ALL_LANGUAGES: PropTypes.arrayOf(PropTypes.string).isRequired,
    ALL_FEATURES: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired).isRequired,
    setFilters: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        name: PropTypes.string,
        features: PropTypes.object.isRequired,
        languages: PropTypes.object.isRequired,
    }).isRequired,
};
