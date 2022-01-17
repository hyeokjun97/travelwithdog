import React from "react";
import { Helmet } from "react-helmet";

const HelmetComponent = ({ desc, title, url, keyword, image }) => {
  return (
    <Helmet>
      {desc && <meta name="description" content={desc} />}
      {keyword && <meta name="keyword" content={keyword} />}
      <link rel="canonical" href="보류" />
      <meta property="og:type" content="website" />
      {title && <meta property="og:title" content={title} />}
      {desc && <meta property="og:description" content={desc} />}
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      {title && <meta property="twitter:title" content={title} />}
      {desc && <meta property="twitter:description" content={desc} />}
      {title && <title>{title}</title>}
    </Helmet>
  );
};

export default HelmetComponent;
