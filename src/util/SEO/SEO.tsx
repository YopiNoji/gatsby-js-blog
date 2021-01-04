import React from "react";
import Helmet from "react-helmet";
import { SiteSiteMetadata, MarkdownRemark } from "../../gatsby-graphql";

type PropsType = {
  postMeta?: MarkdownRemark | null;
  siteMetadata?: SiteSiteMetadata | null;
};

export const SEO: React.FC<PropsType> = ({ postMeta, siteMetadata }) => {
  const siteName = String(siteMetadata?.title);
  const title = postMeta
    ? String(siteMetadata?.title) + " | " + postMeta?.frontmatter?.title
    : String(siteMetadata?.title);
  const description = postMeta
    ? String(postMeta?.frontmatter?.title)
    : String(siteMetadata?.title);
  const image = siteMetadata?.image
    ? siteMetadata?.siteUrl + siteMetadata?.image
    : "";
  const charSet = siteMetadata?.charSet ? siteMetadata?.charSet : "utf-8";
  const lang = siteMetadata?.lang ? siteMetadata?.lang : "en";
  const author = siteMetadata?.author ? siteMetadata?.author : "author";
  const blogURL = siteMetadata?.siteUrl ? siteMetadata?.siteUrl : "";
  const postURL = postMeta?.frontmatter?.slug
    ? blogURL + "/" + postMeta?.frontmatter?.slug
    : blogURL;
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": postMeta ? "Article" : "WebSite",
      url: postURL,
      name: title,
      headline: title,
      description: description,
      author: author,
    },
  ];
  return (
    <Helmet>
      {/* General tags */}
      <title>{title}</title>
      <meta charSet={charSet} />
      <html lang={lang} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postURL} />
      <meta property="og:type" content={postMeta ? "article" : "website"} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="fb:app_id" content={""} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script
        data-ad-client="ca-pub-1604121216663260"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
    </Helmet>
  );
};
