module.exports = {
  siteMetadata: {
    title: `Eaveswall`,
    author: [`Caleb Pitan`, `John Oluwakeye`],
    description: `Engage in the interesting discussions and gists that happen on the eaves blogging site and the media wall for all`,
    siteUrl: "https://eaveswall.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eaveswall`,
        short_name: `Eaveswall`,
        start_url: `/`,
        background_color: `#f7fafc`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/eaveswall-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Override the file regex for SASS
        sassRuleTest: /\.global\.s(a|c)ss$/,
        // Override the file regex for CSS modules
        sassRuleModulesTest: /\.mod\.s(a|c)ss$/,
        useResolveUrlLoader: {
          options: {
            sourceMap: true, //default is false
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-react-css-modules`,
      options: {
        filetypes: {
          ".scss": { syntax: `postcss-scss` },
        },
        // Exclude global styles from the plugin using a RegExp:
        exclude: `\/global\/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            offsetY: `0`,
            icon: false,
            removeAccents: true,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Questrial`,
          },
          {
            family: `Satisfy`,
          },
          {
            family: `Roboto`,
            variants: [`400`, `500`],
          },
        ],
      },
    },
    `gatsby-plugin-styled-components`,
    // `gatsby-plugin-algolia`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-135955038-2`,
        head: true,
        respectDNT: true,
        pageTransitionDelay: 1000,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        sitemapSize: 5000,
      },
    },
  ],
}
