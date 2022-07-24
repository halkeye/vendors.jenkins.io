/* eslint-disable no-restricted-syntax, no-console */
try {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  require('dotenv').config();
} catch (e) {
  console.warn('problem loading .env', e);// expected in production
}
module.exports = {
  siteMetadata: {
    siteUrl: 'https://vendors.jenkins.io',
    githubRepo: 'halkeye/vendors.jenkins.io',
    buildDate: new Date(),
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-schema-snapshot',
      options: {
        path: 'schema.gql',
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'vendors',
        path: './src/data/vendors'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'features',
        path: './src/data/features'
      }
    },
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
  ],
  mapping: {
    'VendorsYaml.features': 'FeaturesYaml.key',
  }
};

// fancy little script to take any ENV variables starting with GATSBY_CONFIG_ and
// replace the existing export
Object.keys(process.env).forEach((key) => {
  const PREFIX = 'GATSBY_CONFIG_';
  if (!key.startsWith(PREFIX)) {return;}
  // take the env key, less the prefix, split by __ to get the section,
  // then lowercase, and replace _[letter] to be [upper]
  // so GATSBY_CONFIG_SITE_METADATA__URL => siteMetadata.url = value
  const splits = key.substring(PREFIX.length).split('__').map((k) => k.toLowerCase().replace(/_(.)/, (_, val) => val.toUpperCase()));
  let element = module.exports;
  for (const keyPart of splits.slice(0, -1)) {
    element = element[keyPart];
    if (!element) {
      console.log(`cant find ${keyPart} of ${key}`);
      return;
    }
  }
  element[splits.slice(-1)[0]] = process.env[key];
});
