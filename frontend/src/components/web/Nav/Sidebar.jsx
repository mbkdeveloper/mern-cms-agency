import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";

// Assets
import CloseIcon from "../../../assets/svg/CloseIcon";
import LogoIcon from "../../../assets/svg/Logo";
import { ServiceContext } from "../../../context/ServiceContext";
import { HeaderContext } from "../../../context/HeaderContext";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const { headers } = useContext(HeaderContext);
  const { servicesSections } = useContext(ServiceContext);
  return (
    <Wrapper className="animate darkBg" $sidebarOpen={sidebarOpen}>
      <SidebarHeader className="flexSpaceCenter">
        <div className="flexNullCenter">
          <LogoIcon />
          {/* <h1 className="whiteColor font20" style={{ marginLeft: "15px" }}>
            TN Smart IOT
          </h1> */}
        </div>
        <CloseBtn
          onClick={() => toggleSidebar(!sidebarOpen)}
          className="animate pointer"
        >
          <CloseIcon />
        </CloseBtn>
      </SidebarHeader>

      <UlStyle className="flexNullCenter flexColumn">
        {headers?.map((element, index) => {
          if (!element.visibility) return null;
          return (
            <li key={`header-${index}`} className="semiBold font15 pointer">
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px" }}
                to="home"
                spy={true}
                smooth={true}
                offset={-60}
              >
                Home
              </Link>
            </li>
          );
        })}

        {servicesSections?.map((section, sectionIdx) => {
          if (!section.visibility) return null; // skip hidden sections
          return (
            <li
              key={`service-${sectionIdx}`}
              className="semiBold font15 pointer"
            >
              <Link
                onClick={() => toggleSidebar(!sidebarOpen)}
                activeClass="active"
                className="whiteColor"
                style={{ padding: "10px 15px" }}
                to="services"
                spy={true}
                smooth={true}
                offset={-60}
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
              onClick={() => toggleSidebar(!sidebarOpen)}
              activeClass="active"
              className="whiteColor"
              style={{ padding: "10px 15px" }}
              to="contact"
              spy={true}
              smooth={true}
              offset={-60}
            >
              Contact
            </Link>
          </li>
        )}

        {/* <li className="semiBold font15 pointer">
          <Link
            onClick={() => toggleSidebar(!sidebarOpen)}
            activeClass="active"
            className="whiteColor"
            style={{ padding: "10px 15px" }}
            to="projects"
            spy={true}
            smooth={true}
            offset={-60}
          >
            Projects
          </Link>
        </li>*/}
      </UlStyle>
    </Wrapper>
  );
}

// 🔧 Transient prop: $sidebarOpen
const Wrapper = styled.nav`
  width: 400px;
  height: 100vh;
  position: fixed;
  top: 0;
  padding: 0 30px;
  right: ${(props) => (props.$sidebarOpen ? "0px" : "-400px")};
  z-index: 9999;
  transition: right 0.3s ease-in-out;

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px 0;
`;

const CloseBtn = styled.button`
  border: 0px;
  outline: none;
  background-color: transparent;
  padding: 10px;
`;

const UlStyle = styled.ul`
  padding: 40px;
  li {
    margin: 20px 0;
  }
`;
