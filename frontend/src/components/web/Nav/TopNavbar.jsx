import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
// Components
import Sidebar from "./Sidebar";
import Backdrop from "../../Elements/Backdrop";
// Assets
import LogoIcon from "../../../assets/svg/Logo";
import BurgerIcon from "../../../assets/svg/BurgerIcon";
import { HeaderContext } from "../../../context/HeaderContext";
import { ServiceContext } from "../../../context/ServiceContext";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const { headers } = useContext(HeaderContext);
  const { servicesSections } = useContext(ServiceContext);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper
        className="flexCenter animate whiteBg"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          <Link className="pointer flexNullCenter" to="home" smooth={true}>
            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              TN Smart IOT
            </h1>
          </Link>
          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper>
            {headers?.map((element, index) => {
              if (!element.visibility) return null;
              return (
                <li key={`header-${index}`} className="semiBold font15 pointer">
                  <Link
                    activeClass="active"
                    style={{ padding: "10px 15px" }}
                    to="home"
                    spy={true}
                    smooth={true}
                    offset={-80}
                  >
                    Home
                  </Link>
                </li>
              );
            })}
            
            {servicesSections?.map((section, sectionIdx) => {
              if (!section.visibility) return null;
              return (
                <li
                  key={`service-${sectionIdx}`}
                  className="semiBold font15 pointer"
                >
                  <Link
                    activeClass="active"
                    style={{ padding: "10px 15px" }}
                    to="services"
                    spy={true}
                    smooth={true}
                    offset={-80}
                  >
                    Services
                  </Link>
                </li>
              );
            })}

            {(headers?.some((h) => h.visibility) ||
              servicesSections?.some((s) => s.visibility)) && (
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px" }}
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Contact
                </Link>
              </li>
            )}
            {/* <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </Link>
            </li>*/}
          </UlWrapper>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
// const UlWrapperRight = styled.ul`
//   @media (max-width: 760px) {
//     display: none;
//   }
// `;
