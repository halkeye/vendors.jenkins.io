import {graphql, useStaticQuery} from 'gatsby';

export const useAllFeatures = () => {
  const {allFeaturesYaml} = useStaticQuery(graphql`
    query {
      allFeaturesYaml {
        ALL_FEATURES: edges {
          node {
              key
              label
              description
          }
        }
      },
    }
  `);

  return allFeaturesYaml.ALL_FEATURES.map(({node}) => node);
};
