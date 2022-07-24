
import {graphql, useStaticQuery} from 'gatsby';

export const useAllLanguages = () => {
  const {allVendorsYaml: {ALL_LANGUAGES}} = useStaticQuery(graphql`
    query {
      allVendorsYaml {
        ALL_LANGUAGES: distinct(field: languages)
      }
    }
  `);
  return ALL_LANGUAGES;
};
