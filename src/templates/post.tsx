import React from "react";
import { graphql } from "gatsby";
import Base from "@Components/organisms/Base";
import { SEO } from "@Util/SEO";
import { H1, SmallText } from "@Components/atoms/Typography";
import { Card } from "@Components/atoms/Card";
import { Query } from "../gatsby-graphql";
import { RelatedPosts } from "@Components/molecules/RelatedPosts";

type PropsType = {
  data: Query;
};

const Post: React.FC<PropsType> = (props) => {
  const markdownRemark = props.data.markdownRemark;
  const frontmatter = markdownRemark?.frontmatter;
  const siteMetadata = props.data.site?.siteMetadata;
  const title = props.data.site?.siteMetadata?.title
    ? props.data.site?.siteMetadata?.title
    : "";
  const tableOfContents = markdownRemark?.tableOfContents
    ? markdownRemark.tableOfContents
    : "";

  if (!markdownRemark?.html || !frontmatter || !siteMetadata || !title) {
    return null;
  }
  return (
    <Base siteMetadata={siteMetadata}>
      <SEO siteMetadata={siteMetadata} postMeta={markdownRemark} />
      <H1>{frontmatter?.title}</H1>
      <SmallText>{frontmatter?.date}</SmallText>
      <div className="w-full mb-6">
        <Card className="z-20 relative sm:fixed sm:opacity-25 sm:hover:opacity-100 right-0 top-0">
          <div
            className="text-gray-700 dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: tableOfContents }}
          />
        </Card>
        <div
          className="text-gray-700 dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        />
      </div>
      <RelatedPosts frontmatter={frontmatter}></RelatedPosts>
    </Base>
  );
};
export const pageQuery = graphql`
  query Post($slug: String!) {
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
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents(pathToSlugField: "frontmatter.slug")
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
`;
export default Post;
