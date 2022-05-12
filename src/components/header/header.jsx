import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { debounce } from "lodash";

const Header = ({
  isLoggedIn,
  categoryList,
  loginPopupHandler,
  signupPopupHandler,
}) => {
  const headerRef = useRef();
  const navigate = useNavigate();
  const [toggleOn, setToggleOn] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  const bodyRef = useRef(); //
  const itemRef = useRef(); //
  const subRef = useRef(); //

  const { pathname } = window.location;
  const pathList = pathname.split("/");

  const logoutHandler = () => {
    localStorage.removeItem("AK");
    localStorage.removeItem("RK");
    localStorage.removeItem("exp");
    alert("로그아웃 되었습니다.");
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener(
      "scroll",
      debounce(() => {
        setScrollValue(window.scrollY);
      }, 10)
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className={`${
        !toggleOn
          ? scrollValue < 50 && //<-- 이 부부분에서 Header메뉴를 숨김표시 할 수 있습니다. 
            (pathList.length < 3 ||
              pathList[2] === "" ||
              pathList[2] === "rentcar" ||
              pathList[2] === "category" ||
              pathList[2] === "community")
            ? `${styles.header} ${styles.header_on}`
            : `${styles.header} ${styles.header_off}`
          : `${styles.header} ${styles.header_off}`
      }`}
    >
      <div
        onClick={() => {
          setToggleOn(!toggleOn);
        }}
      >
        <i className={`${styles.close} fas fa-bars`}></i>
      </div>

      <div 
        ref = {bodyRef}
        
        className={`${
          !toggleOn
            ? scrollValue < 50 ? `${styles.body} ${styles.body_on}`
            : `${styles.body} ${styles.body_off}`
          : `${styles.body} ${styles.body_off}`
        }`}
        >
          {/*   className={styles.body}>  FOR RETURNING BACK */} 
        <div className={styles.logo_container}>
          <img
            src='./images/logo.png'
            alt="travel_with_dog"
            className={styles.logo}
            onClick={() => {
              setToggleOn(false);
              navigate("/");
              window.scrollTo({ top: 0 });
            }}
          />
        </div>

        <nav
          className={`${
            toggleOn
              ? `${styles.navbar} ${styles.on}`
              : `${styles.navbar} ${styles.off}`
          }`}
        >
          <ul className={styles.menu_list}>
            {categoryList.slice(0, 3).map(
              (
                category //임시로 3개만
              ) => (
                <li
                  key={category.id}
                  //
                  className={
                    (scrollValue < 50) ? `${styles.menu_item_on}`:`${styles.menu_item}`  
                }
                  
                  
                  onClick={() => {
                    setToggleOn(false);
                    navigate(`/category${category.url}`);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {category.name}
                </li>
              )
            )}
            <li
              className={
                  (scrollValue < 50) ? `${styles.menu_item_on}`:`${styles.menu_item}`  
              }
              //{styles.menu_item}
              onClick={() => {
                setToggleOn(false);
                navigate("/rentcar");
                window.scrollTo({ top: 0 });
              }}
            >
              렌터카
            </li>
            <li
              className={
                (scrollValue < 50) ? `${styles.menu_item_on}`:`${styles.menu_item}`  
              }
              onClick={() => {
                setToggleOn(false);
                navigate("/community/1");
                window.scrollTo({ top: 0 });
              }}
            >
              커뮤니티
            </li>
          </ul>
        </nav>
        <div
          className={`${
            toggleOn
              ? `${styles.sub_button_container} : ${styles.on}`
              : `${styles.sub_button_container} ${styles.off}`
          }`}
        >
          <ul className={styles.sub_button_list}>
            <li
              className={
                (scrollValue > 50) ? `${styles.sub_button_item}`:`${styles.sub_button_item_on}`  
            }
              onClick={() => {
                setToggleOn(false);
                navigate("/map");
                window.scrollTo({ top: 0 });
              }}
            >
              멍:지
            </li>
            <li
              className={
                (scrollValue > 50) ? `${styles.sub_button_item}`:`${styles.sub_button_item_on}`  
            }
              onClick={() => {
                setToggleOn(false);
                isLoggedIn ? logoutHandler() : loginPopupHandler();
              }}
            >
              {isLoggedIn ? "로그아웃" : "로그인"}
            </li>
            <li
              className={
                (scrollValue > 50) ? `${styles.sub_button_item}`:`${styles.sub_button_item_on}`  
            }
              onClick={() => {
                setToggleOn(false);
                isLoggedIn ? navigate("/mypage/edit") : signupPopupHandler();
              }}
            >
              {isLoggedIn ? "마이페이지" : "회원가입"}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
