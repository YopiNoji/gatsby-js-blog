import React, { useState, useEffect } from "react";
import Base from "@Components/organisms/Base";
import { PostListing } from "@Components/molecules/PostListing";
import { SEO } from "@Util/SEO";
import { graphql } from "gatsby";
import { Query } from "../gatsby-graphql";

type PropsType = {
  data: Query;
};
const Index: React.VFC<PropsType> = (props) => {
  const siteMetadata = props.data.site?.siteMetadata;
  const [state, setState] = useState(siteMetadata?.lang);
  useEffect(() => {
    const language =
      (window.navigator.languages && window.navigator.languages[0]) ||
      window.navigator.language;
    setState(language);
  }, []);
  const Posts = props.data.allMarkdownRemark.edges.filter((edge) => {
    let filterdPost;
    switch (state) {
      case "en":
      case "en-US":
      case "en-GB":
        filterdPost = edge.node.frontmatter?.lang === "en";
        break;
      case "ja":
      case "ja-JP":
        filterdPost = edge.node.frontmatter?.lang === "ja";
        break;
      default:
        return edge.node.frontmatter?.lang === "ja";
    }
    return filterdPost;
  });
  return (
    <Base siteMetadata={siteMetadata}>
      <SEO siteMetadata={siteMetadata} />
      <PostListing data={Posts} />
    </Base>
  );
};

export default Index;

export const pageQuery = graphql`
  query Index {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        email
        image
        twitterId
        githubId
        googleAdSense
        copyright
        lang
        charSet
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            category
            lang
            date
            slug
            tags
            title
          }
        }
      }
    }
  }
`;
