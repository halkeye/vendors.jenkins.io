import * as React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import Layout from '../layout';
import {SearchBox} from '../components/SearchBox';
import {ListGroup} from 'react-bootstrap';
import {fuzzy} from 'fast-fuzzy';
import {by639_1} from 'iso-language-codes';

const filterVendors = (filters, vendors) => {
  return vendors.filter(({node: vendor}) => {
    if (filters.name) {
      if (fuzzy(filters.name, vendor.name) < 0.5) {
        return false;
      }
    }
    if (Object.keys(filters.languages).length > 0) {
      if (!Object.keys(filters.languages).every(lang => vendor.languages.includes(lang))) {
        return false;
      }
    }
    if (Object.keys(filters.features).length > 0) {
      if (!Object.keys(filters.features).every(feature => vendor.features[feature])) {
        return false;
      }
    }
    return true;
  })
}

const IndexPage = () => {
  const {allVendorsYaml: {ALL_LANGUAGES, vendors}, allFeaturesYaml} = useStaticQuery(graphql`
    query {
      allFeaturesYaml {
        ALL_FEATURES: edges {
          node {
            key
            label
          }
        }
      },
      allVendorsYaml {
        ALL_LANGUAGES: distinct(field: languages)
        vendors: edges {
          node {
            features {
              certifications
              custom_builds
              support
              training
            }
            id
            languages
            locations {
              name
              timezone
            }
            logo
            name
            url
            community_members
            parent {
              ... on File {
                name
                relativePath
                relativeDirectory
              }
            }
          }
        }
      }
    }
  `);
  const ALL_FEATURES = allFeaturesYaml.ALL_FEATURES.map(({node}) => node);
  const [filters, setFilters] = React.useState({
    name: '',
    features: {},
    languages: {},
  });

  console.log('filters', filters);

  const filteredVendors = filterVendors(filters, vendors);

  return (
    <Layout>
      <div className="container">
        <div className="row body">
          <SearchBox ALL_LANGUAGES={ALL_LANGUAGES} ALL_FEATURES={ALL_FEATURES} setFilters={setFilters} filters={filters} />
          <div className="row">
            <div className="col">
              <h4 className="display-4">Results</h4>
              {filteredVendors.length === 0 && <strong>No results</strong>}
              {filteredVendors.length > 0 && (<ListGroup>
                {filteredVendors.map(({node: vendor}) => {
                  return (
                    <div key={vendor.id} className="border border-dark rounded mb-3">
                      <div className="row">
                        <div className="col-md-1 d-none d-md-block">
                          <img src={vendor.logo} alt={`${vendor.name} Logo`} className="img-fluid" />
                        </div>
                        <div className="col">
                          <h3 className="display-3">{vendor.name}</h3>
                          <h5>Features:</h5>
                          {ALL_FEATURES.filter(feature => vendor.features[feature.key]).map(feature => (
                            <div key={feature.key} style={{
                              display: 'inline-block',
                              color: vendor.features[feature.key] ? 'green' : '',
                              width: '150px'
                            }}>
                              {vendor.features[feature.key] && <ion-icon name="checkmark-circle"></ion-icon>}
                              {' '}
                              {feature.label}
                            </div>
                          ))}
                          <h5>Langauges:</h5>
                          {vendor.languages.map(lang => (<div key={lang} style={{display: 'inline-block', width: '150px'}}>{by639_1[lang].name}</div>))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ListGroup>)
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
