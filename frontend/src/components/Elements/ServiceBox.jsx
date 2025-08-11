import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";
export default function ServiceBox({ icon, title, subtitle }) {
  let getIcon;

  switch (icon) {
    default:
      getIcon = <Image src={icon} alt={title} height={90} />;
      break;
  }

  return (
    <Wrapper className="flex flexColumn">
      <IconStyle className=" text-md-center">{getIcon}</IconStyle>
      <TitleStyle className="font20 extraBold">{title}</TitleStyle>
      <SubtitleStyle className="font13">{subtitle}</SubtitleStyle>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const IconStyle = styled.div`
  @media (max-width: 860px) {
    margin: 0 auto;
  }
`;
const TitleStyle = styled.h2`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 40px 0;
  @media (max-width: 860px) {
    padding: 20px 0;
  }
`;
const SubtitleStyle = styled.p`
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
`;
