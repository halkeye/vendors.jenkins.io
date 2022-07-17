import * as React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import Layout from '../layout';
import {SearchBox} from '../components/SearchBox';
import {VendorBox} from '../components/VendorBox';
import {ListGroup} from 'react-bootstrap';
import {fuzzy} from 'fast-fuzzy';

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
    });
};

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
            fields {
              slug
            }
            logo {
              childImageSharp {
                gatsbyImageData(width: 200)
              }
            }
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

    const filteredVendors = filterVendors(filters, vendors);

    return (
        <Layout sourcePath="src/pages/index.js">
            <div className="container">
                <div className="row body">
                    <SearchBox ALL_LANGUAGES={ALL_LANGUAGES} ALL_FEATURES={ALL_FEATURES} setFilters={setFilters} filters={filters} />
                    <div className="row">
                        <div className="col">
                            <h4 className="display-4">Results</h4>
                            {filteredVendors.length === 0 && <strong>No results</strong>}
                            {filteredVendors.length > 0 && (<ListGroup>
                                {filteredVendors.map(({node: vendor}) => (
                                    <VendorBox key={vendor.id} vendor={vendor} ALL_FEATURES={ALL_FEATURES} />
                                ))}
                            </ListGroup>)}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;
