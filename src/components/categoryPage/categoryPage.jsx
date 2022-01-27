import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HelmetComponent from "../helmetComponent/helmetComponent";
import LoadingPage from "../loadingPage/loadingPage";
import SlickTemplate from "../slick/slickTemplate/slickTemplate";
import styles from "./categoryPage.module.css";

const CategoryPage = ({ loadPageData }) => {
  const [pageData, setPageData] = useState(null);
  const { path } = useParams();

  const settingPageData = (data) => {
    setPageData(data);
  };

  useEffect(() => {
    setPageData(null);
    loadPageData(path, settingPageData);
  }, [path]);

  return (
    <>
      {pageData ? (
        <main className={styles.main}>
          <HelmetComponent
            title={pageData.html_title}
            desc={pageData.html_description}
            url={`https://www.travelwithdog.co.kr/category/${path}`}
            keyword={pageData.html_keyword}
          />
          <div
            className={styles.top_banner}
            style={{
              background: `url("${pageData.image_url}") center/cover no-repeat`,
            }}
          >
            <div className={styles.top_filter}>
              <p className={styles.title}>{pageData && pageData.title}</p>
              <p className={styles.subtitle}>{pageData && pageData.subtitle}</p>
            </div>
          </div>
          <div className={styles.list_part}>
            {pageData.sections.map(
              (section) =>
                section.items.length > 0 && ( //일단 빈데이터 있어서 이렇게 해둠
                  <div key={section.title} className={styles.list_container}>
                    <p className={styles.list_title}>{section.title}</p>
                    {section.subtitle && (
                      <p className={styles.list_subtitle}>{section.subtitle}</p>
                    )}
                    <SlickTemplate sectionInfo={section} />
                  </div>
                )
            )}
          </div>
        </main>
      ) : (
        <div className={styles.loading}>
          <LoadingPage />
        </div>
      )}
    </>
  );
};

export default CategoryPage;
