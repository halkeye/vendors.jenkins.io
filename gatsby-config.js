module.exports = {
    siteMetadata: {
        siteUrl: 'https://vendors.jenkins.io',
        githubRepo: 'halkeye/vendors.jenkins.io'
    },
    plugins: [
        'gatsby-plugin-netlify-cms',
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
        'gatsby-transformer-yaml'
    ]
};
