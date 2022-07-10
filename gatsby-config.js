module.exports = {
  siteMetadata: {
    siteUrl: `https://vendors.jenkins.io`
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "vendors",
        path: "./src/vendors"
      }
    },
    "gatsby-transformer-yaml"
  ]
};
