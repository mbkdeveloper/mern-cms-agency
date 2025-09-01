import React, { useEffect } from "react";
import styled from "styled-components";
import TestimonialSlider from "../../Elements/TestimonialSlider";
import useTestimonial from "../../../hooks/useTestimonial";

const Testimonial = () => {
  const { testimonialsSections, fetchTestimonialsSections } = useTestimonial();

  useEffect(() => {
    fetchTestimonialsSections();
  }, [fetchTestimonialsSections]);

  return (
    <>
      {testimonialsSections?.some((element) => element.visibility) && (
        <Wrapper>
          <div className="whiteBg">
            <div style={{ padding: "50px 0" }}>
              <div className="container">
                {testimonialsSections.map((section, sectionIdx) => (
                  <HeaderInfo key={section._id || sectionIdx}>
                    <h1 className="font40 extraBold">{section.sectionTitle}</h1>
                    <p className="font13" style={{ maxWidth: "700px" }}>
                      {section.sectionDescription}
                    </p>
                    <TestimonialSlider testimonials={section.testimonials} />
                  </HeaderInfo>
                ))}
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </>
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
