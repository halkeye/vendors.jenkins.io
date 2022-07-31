const {makeReactLayout, saveReactLayout} = require('@halkeye/jenkins-io-react/makeLayout');
const fetch = require('node-fetch');
const path = require('path');
//const YAML = require('yaml');

exports.onPreBootstrap = async () => {
  await makeReactLayout('https://vendors.jenkins.io').then(saveReactLayout);
};

const _maintainers = fetch('https://reports.jenkins.io/maintainers-info-report.json')
  .then(response => response.json())
  .then((maintainers) => {
    return Object.values(maintainers).reduce((prev, maintainer) => {
      prev[maintainer.name] = maintainer.displayName;
      return prev;
    }, {});
  });

const _plugins = fetch('https://updates.jenkins.io/update-center.actual.json')
  .then(response => response.json())
  .then(({plugins}) => {
    return Object.values(plugins).reduce((prev, plugin) => {
      prev[plugin.name] = plugin.title;
      return prev;
    }, {});
  });

exports.onCreateNode = async ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  const fileNode = getNode(node.parent);
  if ((node.internal.type === 'VendorsYaml') && fileNode.internal.type === 'File') {
    const parsedFilePath = path.parse(fileNode.relativePath);

    createNodeField({
      name: 'slug',
      node,
      value: parsedFilePath.name,
    });
  }
  if (node.internal.type === 'VendorsYaml') {
    const maintainers = await _maintainers;
    const plugins = await _plugins;

    createNodeField({
      name: 'community_members',
      node,
      value: node?.community_members?.map(i => ({id: i, displayName: maintainers[i] || i})) || []
    });
    createNodeField({
      name: 'plugins',
      node,
      value: node?.plugins?.map(i => ({id: i, displayName: plugins[i] || i})) || []
    });
    createNodeField({
      name: 'pluginsCount',
      node,
      value: node?.plugins?.length || 0
    });
  }
};

async function createVendorPages({graphql, createPage, createRedirect}) {
  const vendorTemplate = path.resolve('src/templates/vendor.jsx');
  const result = await graphql(`{
      vendors: allVendorsYaml {
        edges {
          vendor: node {
            id
            fields {
              slug
            }
          }
          next {
            id
            fields {
              slug
            }
          }
          previous {
            name
            fields {
              slug
            }
          }
        }
      }
    }`);

  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  result.data.vendors.edges.forEach(edge => {
    createPage({
      path: `/vendor/${edge.vendor.fields.slug}/`,
      component: vendorTemplate,
      context: {
        id: edge.vendor.id,
        next: edge.next,
        previous: edge.previous,
      }
    });
  });
}

exports.createPages = async ({graphql, actions: {createPage, createRedirect}}) => {
  await createVendorPages({graphql, createPage, createRedirect});
};

/*
exports.createSchemaCustomization = ({actions: {createTypes}}) => {
    createTypes(`
        type UserStoryMetadata {
          build_tools: [String]
          community_supports: [String]
          company: String
          company_website: String
          industries: [String]
          organization: String
          platforms: [String]
          plugins: [String]
          programming_languages: [String]
          project_funding: String
          project_website: String
          summary: String
          team_members: [String]
          version_control_systems: [String]
        }

        type UserStoryBody_content @dontinfer {
          title: String
          paragraphs: [MarkdownRemark] @link
        }

  `);
};

exports.onCreateWebpackConfig = ({stage, loaders, actions}) => {
    if (stage === 'build-html') {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /leaflet/,
                        use: loaders.null(),
                    },
                ],
            },
        });
    }
};
*/
