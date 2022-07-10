import * as React from "react"
import {graphql, useStaticQuery} from "gatsby";
import Layout from '../layout.jsx';
import 'react-bootstrap-drawer/lib/style.css';
import {Drawer, } from 'react-bootstrap-drawer';
import {by639_1} from 'iso-language-codes'
import {
  Col,
  Collapse,
  Row,
  Form,
  ListGroup
} from 'react-bootstrap';


// alternative - https://stackoverflow.com/questions/60482018/make-a-sidebar-from-react-bootstrap
// https://bootstrapious.com/p/bootstrap-sidebar
const ApplicationDrawer = ({languages, ...props}) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen(!open);

  const selectLanguage = (e) => {
    console.log('selectLanguage', e.target.dataset.lang)
  }

  const selectFeature = (e) => {
    console.log('selectFeature', e.target.dataset.lang)
  }

  return (
    <Drawer {...props}>
      <Drawer.Toggle onClick={handleToggle} />

      <Collapse in={open}>
        <Drawer.Overflow>
          <Drawer.ToC>
            <Drawer.Nav>
              <Drawer.Item><Form.Control type="text" label={"Name"} onChange={selectFeature} placeholder="Vendor Name" /></Drawer.Item>
              <Drawer.Header>Languages</Drawer.Header>
              {languages.map(lang => <Drawer.Item key={lang}><Form.Check type="checkbox" id={`checkbox-lang-${lang}`} label={by639_1[lang]?.name || lang} onChange={selectLanguage} data-lang={lang} /></Drawer.Item>)}
              <Drawer.Header>Features</Drawer.Header>
              <Drawer.Item><Form.Check type="checkbox" label={"Certifications"} onChange={selectFeature} data-feature="certifications" /></Drawer.Item>
              <Drawer.Item><Form.Check type="checkbox" label={"Custom Builds"} onChange={selectFeature} data-feature="custom_builds" /></Drawer.Item>
              <Drawer.Item><Form.Check type="checkbox" label={"Support"} onChange={selectFeature} data-feature="support" /></Drawer.Item>
              <Drawer.Item><Form.Check type="checkbox" label={"Training"} onChange={selectFeature} data-feature="training" /></Drawer.Item>
            </Drawer.Nav>
          </Drawer.ToC>
        </Drawer.Overflow>
      </Collapse>
    </Drawer>
  );
};

const IndexPage = () => {
  const {allVendorsYaml: {languages, vendors}} = useStaticQuery(graphql`
    query {
      allVendorsYaml {
        languages: distinct(field: languages)
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
  return (
    <Layout>
      <Row className="flex-xl-nowrap">
        <Col as={ApplicationDrawer} languages={languages} xs={12} md={3} lg={2} />
        <Col xs={12} md={9} lg={10}>
          <div className="row">
            <div className="col">
              <ListGroup>
                {vendors.map(({node: vendor}) => {
                  return (
                    <ListGroup.Item key={vendor.id}>
                      <img src={vendor.logo} />
                      {vendor.name}
                      <br /><textarea style={{width: '100%', height: '100%'}}>{JSON.stringify(vendor, null, 4)}</textarea>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
