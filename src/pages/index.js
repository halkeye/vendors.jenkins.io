import * as React from 'react';
import {graphql, useStaticQuery} from 'gatsby';
import Layout from '../layout';
import {SearchBox} from '../components/SearchBox';
import {VendorBox} from '../components/VendorBox';
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
  const {allVendorsYaml: {vendors}} = useStaticQuery(graphql`
    query {
      allVendorsYaml {
        vendors: edges {
          node {
            features {
              key
              label
              description
            }
            id
            languages
            fields {
              slug
            }
            logo {
              childImageSharp {
                gatsbyImageData(width: 100)
              }
              publicURL
            }
            name
          }
        }
      }
    }
  `);
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
          <SearchBox setFilters={setFilters} filters={filters} />
          <div className="row">
            <div className="col">
              <h4 className="display-4">Results</h4>
              {filteredVendors.length === 0 && <strong>No results</strong>}
              {filteredVendors.length > 0 && (<div className="card-group">{filteredVendors.map(({node: vendor}) => <VendorBox vendor={vendor} key={vendor.id}/>)}</div>)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
