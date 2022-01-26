import React from "react";
import { Helmet } from "react-helmet";

//필요한 페이지
//pages에 담겨있는 페이지들 (API는 있는데 아직 데이터가 없음)
//상품 정보 페이지 O
//지도 팝업 O

const HelmetComponent = ({ desc, title, url, keyword, image }) => {
  // console.log(desc);
  // console.log(title);
  // console.log(url);
  // console.log(keyword);
  // console.log(image);
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
