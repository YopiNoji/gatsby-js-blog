module.exports = {
  siteMetadata: {
    siteUrl: `https://yopinoji.com/`,
    title: `yopinoji.com`,
    description: `A certain software engineer's notes and labs.`,
    image: `/Yopinoji.png`,
    author: `yopinoji`,
    email: `yopinoji@gmail.com`,
    twitterId: ``,
    githubId: `YopiNoji`,
    googleAdSense: `ca-pub-1604121216663260`,
    copyright: `© YopiNoji. All Rights Reserved.`,
    lang: `ja`,
    charSet: `utf-8`
  },
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    'gatsby-plugin-react-helmet',
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: 'UA-131756589-2'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    'gatsby-plugin-postcss',
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `YopiNoji.com`,
        short_name: `YopiNoji.com`,
        lang: `ja`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/assets/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop', 'build-javascript'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/contents`,
        name: `contents`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets\/.*\.svg/,
        }
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-external-links",
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              withWebp: true,
              backgroundColor: 'none',
              quality: 60,
            },
          },
          
        ],
      },
    },
    // If you need to analyze bundle size, uncomment following.
    // {
    //   resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
    //   options: {
    //     devMode: true,
    //   },
    // },
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: `gatsby-plugin-graphql-codegen`,
      options: {
        fileName: `./src/gatsby-graphql.ts`,
        codegenDelay: 200000,
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.frontmatter.title,
                  categories: edge.node.frontmatter.tags,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + '/' + edge.node.frontmatter.slug,
                  custom_elements: [
                    { "content:encoded": edge.node.html },
                    { author: '' }
                  ],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      frontmatter {
                        slug
                        category
                        cover
                        date
                        tags
                        title
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "RSS Feed",
          },
        ],
      },
    },
  ],
}
