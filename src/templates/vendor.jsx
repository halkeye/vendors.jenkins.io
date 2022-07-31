import React from 'react';
import PropTypes from 'prop-types';
import {graphql, Link} from 'gatsby';

import {LocalPropTypes} from '../proptypes';
import {useAllFeatures} from '../hooks';
import {Feature} from '../components/Feature';
import {LocalTimeOffset} from '../components/LocalTimeOffset';
import {Language} from '../components/Language';
import {VendorLogo} from '../components/VendorLogo';

import Layout from '../layout';

import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

const VendorPage = ({data: {vendor}}) => {
  const [tab, setTab] = React.useState('about');
  const ALL_FEATURES = useAllFeatures();
  const vendorFeatures = vendor.features.map(f => f.key);
  const vendorUrls = vendor.urls.reduce((prev, cur) => { prev[cur.type] = cur.url; return prev; }, {});
  return (
    <Layout sourcePath={`src/data/vendors/${vendor.parent.relativePath}`}>
      <Tab.Container id="vendor-page" activeKey={tab}>
        <div className="container">
          <Link to="/">&lt;-- Back</Link>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <VendorLogo logo={vendor.logo} alt={`${vendor.name} Logo`} className="text-center mx-auto img-thumbnail" style={{width: '270px'}} />
              </div>
              <div className="profile-work">
                <ul>
                  <li><a href={vendorUrls.support}>Support Link</a></li>
                  <li><a href={vendorUrls.company}>Website Link</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <h2>{vendor.name}</h2>
              <Nav variant="tabs" activeKey={tab} role="tablist" fill>
                <Nav.Item><Nav.Link onClick={(e) => { e.preventDefault(); setTab('about'); return false; }} eventKey="about" href="#">About</Nav.Link></Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="plugins" href="#" onClick={(e) => { e.preventDefault(); setTab('plugins'); return false; }}>
                    Plugins
                    {' '}
                    <Badge bg="info">{vendor.fields.plugins.length}</Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="community_members" href="#" onClick={(e) => { e.preventDefault(); setTab('community_members'); return false; }}>
                    Community Members
                    {' '}
                    <Badge bg="info">{vendor.fields.community_members.length}</Badge>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="about">
                  <div className="row">
                    <div className="col-md-3">
                      <label>Languages</label>
                    </div>
                    <div className="col-md-9">
                      <ul className="">
                        {vendor.languages.map(language => (<li key={language}><Language language={language} /></li>))}
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <label>Offerings</label>
                    </div>
                    <div className="col-md-9">
                      <ul className="">
                        {ALL_FEATURES.map(feature => (<li key={feature.key}><Feature feature={feature} checked={vendorFeatures.includes(feature.key)} /></li>))}
                      </ul>
                    </div>
                  </div>
                  <h5>Locations</h5>
                  {vendor.locations.map(loc => (<div key={loc.name} className="m-3 border-bottom border-dark">
                    <div className="row">
                      <div className="col-md-3"><label>Location</label></div>
                      <div className="col-md-9">{loc.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-3"><label>Timezone</label></div>
                      <div className="col-md-9">{loc.timezone > 0 ? (`+${ loc.timezone.toString().padStart(4, '0')}`) : (`-${ Math.abs(loc.timezone).toString().padStart(4, '0')}`)}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-3"><label>Local Time</label></div>
                      <div className="col-md-9"><LocalTimeOffset offsetSeconds={loc.timezone*60*1000} /></div>
                    </div>
                  </div>))}
                </Tab.Pane>
                <Tab.Pane eventKey="plugins">
                  <ListGroup>
                    {vendor.fields.plugins.sort().map(p => <ListGroup.Item key={p.id}><a href={`https://plugins.jenkins.io/${p.id}`}>{`${p.displayName} (${p.id})`}</a></ListGroup.Item>)}
                  </ListGroup>
                </Tab.Pane>
                <Tab.Pane eventKey="community_members">
                  <ListGroup>
                    {vendor.fields.community_members.sort().map(m => <ListGroup.Item key={m.id}>{`${m.displayName} (${m.id})`}</ListGroup.Item>)}
                  </ListGroup>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </div>
      </Tab.Container>
    </Layout>
  );
};

VendorPage.propTypes = {
  data: PropTypes.shape({
    vendor: LocalPropTypes.vendor.isRequired,
  }).isRequired
};
VendorPage.displayName = 'VendorPage';

export default VendorPage;

export const query = graphql`
  query Query($id: String!) {
    vendor: vendorsYaml(id: {eq: $id}) {
      id
      features {
        id
        key
        label
        description
      }
      fields {
        community_members {
          id
          displayName
        }
        plugins {
          id
          displayName
        }
        pluginsCount
        slug
      }
      languages
      locations {
        name
        timezone
      }
      logo {
        base
      }
      name
      urls {
        type
        url
      }
      logo {
        childImageSharp {
          gatsbyImageData(width: 270)
        }
        publicURL
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
  }
  `;
