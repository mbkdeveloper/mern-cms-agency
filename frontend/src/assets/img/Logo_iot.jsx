import LogoIot from "./logo_iot.png";
import styled from "styled-components";
import { Image } from "react-bootstrap";

const StyledLogo = styled(Image)`
  width: 160px;
  height: 40px;

  @media (max-width: 768px) {
    width: 100px;
    height: 40px;
  }
`;

function ImgComponent(props) {
  return <StyledLogo src={LogoIot} alt="LogoIot" />;
}

export default ImgComponent;
