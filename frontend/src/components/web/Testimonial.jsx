import React from "react";
import styled from "styled-components";
import TestimonialSlider from "../Elements/TestimonialSlider";

const Testimonial = () => {
  return (
    <Wrapper id="blog">
      <div className="whiteBg">
          <div className="lightBg" style={{ padding: "50px 0" }}>
            <div className="container">
              <HeaderInfo>
                <h1 className="font40 extraBold">What They Say?</h1>
                <p className="font13">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut
                  <br />
                  labore et dolore magna aliquyam erat, sed diam voluptua.
                </p>
              </HeaderInfo>
              <TestimonialSlider />
            </div>
          </div>
        </div>
    </Wrapper>
  );
};

export default Testimonial;
const Wrapper = styled.section`
  width: 100%;
  padding-top: 20px;
`;
const HeaderInfo = styled.div`
  margin-bottom: 30px;
  @media (max-width: 860px) {
    text-align: center;
  }
`;
