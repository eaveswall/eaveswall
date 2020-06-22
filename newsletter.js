const { graphql } = require("gatsby")
const fetch = require("node-fetch")
const { spawn } = require("child_process")

const query = graphql`
  query MyQuery {
    allMdx(
      filter: {
        frontmatter: {
          date: { gte: "2020-06-16", lte: "2020-06-19" }
          publish: { eq: true }
        }
      }
    ) {
      edges {
        node {
          frontmatter {
            author
            date(formatString: "ddd. MMM DD, YYYY")
            desc
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  base64
                  srcWebp
                  src
                }
              }
            }
          }
          excerpt(truncate: false, pruneLength: 200)
        }
      }
    }
  }
`

spawn('gatsby develop')
